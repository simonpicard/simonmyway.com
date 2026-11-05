// Auto-enhances photos with Core Image's automatic adjustments, the "Enhance"
// of iPhoto: vibrance, tone curve, highlights/shadows and face balance, chosen
// per image after analysing it. Metadata (copyright...) is kept. macOS only.
//
// Usage: swift scripts/auto_enhance.swift <output-dir> <image>...
//
// Run it once, on the original photos (not on charts or screenshots): running
// it again on its own output would enhance twice. The output directory must
// differ from the images' directory, then copy the results you keep into
// public/img/posts/<post>/.

import CoreImage
import Foundation
import ImageIO
import UniformTypeIdentifiers

let args = Array(CommandLine.arguments.dropFirst())
guard args.count >= 2 else {
    FileHandle.standardError.write("usage: auto_enhance.swift <output-dir> <image>...\n".data(using: .utf8)!)
    exit(1)
}

let outputDir = URL(fileURLWithPath: args[0], isDirectory: true)
try FileManager.default.createDirectory(at: outputDir, withIntermediateDirectories: true)
let context = CIContext()
let sRGB = CGColorSpace(name: CGColorSpace.sRGB)!

// "CIVibrance amount=0.12" style summary of what was applied.
func describe(_ filter: CIFilter) -> String {
    let values = filter.inputKeys
        .filter { $0 != kCIInputImageKey }
        .compactMap { key -> String? in
            let short = key.replacingOccurrences(of: "input", with: "")
            switch filter.value(forKey: key) {
            case let number as NSNumber: return "\(short)=\(String(format: "%.2f", number.doubleValue))"
            case let vector as CIVector: return "\(short)=(\(String(format: "%.2f", vector.x)),\(String(format: "%.2f", vector.y)))"
            default: return nil
            }
        }
    return "\(filter.name) \(values.joined(separator: " "))"
}

var failed = false
for path in args.dropFirst() {
    let url = URL(fileURLWithPath: path)
    if url.deletingLastPathComponent().standardizedFileURL == outputDir.standardizedFileURL {
        print("ERROR \(url.lastPathComponent): would overwrite the original, use another output directory")
        failed = true
        continue
    }
    guard let source = CGImageSourceCreateWithURL(url as CFURL, nil),
          let image = CIImage(contentsOf: url, options: [.applyOrientationProperty: true]) else {
        print("ERROR \(url.lastPathComponent): unreadable")
        failed = true
        continue
    }

    let filters = image.autoAdjustmentFilters(options: [.redEye: false])
    var output = image
    for filter in filters {
        filter.setValue(output, forKey: kCIInputImageKey)
        if let result = filter.outputImage { output = result }
    }

    let target = outputDir.appendingPathComponent(url.lastPathComponent)
    guard let pixels = context.createCGImage(output, from: image.extent, format: .RGBA8, colorSpace: sRGB),
          let destination = CGImageDestinationCreateWithURL(target as CFURL, UTType.jpeg.identifier as CFString, 1, nil) else {
        print("ERROR \(url.lastPathComponent): cannot render")
        failed = true
        continue
    }
    let options: [CFString: Any] = [
        // About quality 91 on the libjpeg scale, like the Sportograf originals.
        kCGImageDestinationLossyCompressionQuality: 0.7,
        kCGImageDestinationOrientation: 1, // pixels are already upright
    ]
    CGImageDestinationAddImageAndMetadata(destination, pixels, CGImageSourceCopyMetadataAtIndex(source, 0, nil), options as CFDictionary)
    if !CGImageDestinationFinalize(destination) {
        print("ERROR \(url.lastPathComponent): cannot write")
        failed = true
        continue
    }
    let applied = filters.isEmpty ? "no adjustment" : filters.map(describe).joined(separator: " | ")
    print("\(url.lastPathComponent): \(applied)")
}
exit(failed ? 1 : 0)
