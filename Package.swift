// swift-tools-version:5.3
import PackageDescription

let package = Package(
    name: "TreeSitterShosts",
    products: [
        .library(name: "TreeSitterShosts", targets: ["TreeSitterShosts"]),
    ],
    dependencies: [
        .package(url: "https://github.com/ChimeHQ/SwiftTreeSitter", from: "0.8.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterShosts",
            dependencies: [],
            path: ".",
            sources: [
                "src/parser.c",
                // NOTE: if your language has an external scanner, add it here.
            ],
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterShostsTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterShosts",
            ],
            path: "bindings/swift/TreeSitterShostsTests"
        )
    ],
    cLanguageStandard: .c11
)
