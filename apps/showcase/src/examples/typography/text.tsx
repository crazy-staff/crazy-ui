import { Typography } from '@crazy-staff/ui';

export default function TypographyText() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <Typography.Lead>Ideas, votes and the roadmap of the trainer, in one place.</Typography.Lead>
      <Typography.P>
        Post an idea, vote for the ones you want and follow them from <Typography.InlineCode>planned</Typography.InlineCode> to{' '}
        <Typography.InlineCode>released</Typography.InlineCode>. Press <Typography.Kbd>F8</Typography.Kbd> in game to open
        the menu. See the <Typography.Link href="#roadmap">roadmap</Typography.Link>.
      </Typography.P>
      <Typography.Large>128 votes</Typography.Large>
      <Typography.Small>Updated today</Typography.Small>
      <Typography.Muted>Only testers can mark a feature as verified.</Typography.Muted>
    </div>
  );
}
