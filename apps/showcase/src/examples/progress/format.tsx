import { Progress } from '@crazy-staff/ui';

export default function ProgressFormat() {
  return (
    <Progress
      value={23}
      max={31}
      label="Features verified"
      getAriaValueText={(_, value) => `${value} of 31 features`}
      className="max-w-md"
      classNames={{ indicator: 'bg-success' }}
    />
  );
}
