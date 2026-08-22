export function buildEmbed({ title, content, footer, color }) {
  return {
    type: 4,
    data: {
      flags: 32768,
      components: [
        {
          type: 17, // Container
          accent_color: color ?? 0x5a5a5a,
          components: [
            {
              type: 10, // Text Display
              content: `## ${title}`,
            },
            {
              type: 10,
              content,
            },
            ...(footer
              ? [
                  { type: 14, divider: true, spacing: 1 }, // Separator
                  { type: 10, content: `-# ${footer}` },
                ]
              : []),
          ],
        },
      ],
    },
  };
}
