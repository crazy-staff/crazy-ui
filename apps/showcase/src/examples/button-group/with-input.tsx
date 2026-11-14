import { Button, ButtonGroup, Input } from '@crazy-staff/ui';

export default function ButtonGroupWithInput() {
  return (
    <ButtonGroup aria-label="Give item" className="w-full max-w-sm">
      <Input aria-label="Item code" placeholder="ItMw_1H_Sword_01" className="flex-1" />
      <Button variant="outline">Give</Button>
    </ButtonGroup>
  );
}
