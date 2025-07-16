import { test, expect } from '@playwright/experimental-ct-react';
import Button from './ButtonComp';

test('should render Button with default props', async ({ mount }) => {
  const component = await mount(<Button>Click Me</Button>);
  await expect(component).toContainText('Click Me');
});
