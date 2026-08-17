export type SDK = 'Go' | 'Java' | 'Python' | 'Ruby' | 'TypeScript';

/**
 * Maps an SDK label to the SdkSvg "block" icon name — shared by
 * IntegrationsGrid, GuidesGrid, and the AI Cookbook cards so the same SDK
 * always gets the same icon everywhere.
 */
export const SDK_BLOCK_NAMES: Record<SDK, string> = {
  Go: 'goLangBlock',
  Java: 'javaBlock',
  Python: 'pythonBlock',
  Ruby: 'rubyBlock',
  TypeScript: 'typeScriptBlock',
};
