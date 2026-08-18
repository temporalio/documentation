export type SDK = 'Dotnet' | 'Go' | 'Java' | 'Php' | 'Python' | 'Ruby' | 'Rust' | 'TypeScript';

/**
 * Maps an SDK label to the SdkSvg "block" icon name — shared by
 * IntegrationsGrid, GuidesGrid, and the AI Cookbook cards so the same SDK
 * always gets the same icon everywhere. Covers all 8 Temporal SDKs (see
 * SdkGuideLinks' identifier list in readme/COMPONENTS.md), even though some
 * consumers (e.g. IntegrationsGrid's ALL_SDKS) only surface a subset today.
 */
export const SDK_BLOCK_NAMES: Record<SDK, string> = {
  Dotnet: 'dotnetBlock',
  Go: 'goLangBlock',
  Java: 'javaBlock',
  Php: 'phpBlock',
  Python: 'pythonBlock',
  Ruby: 'rubyBlock',
  Rust: 'rustBlock',
  TypeScript: 'typeScriptBlock',
};
