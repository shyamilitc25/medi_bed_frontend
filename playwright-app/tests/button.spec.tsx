import { test, expect } from "@playwright/experimental-ct-react";
import Button from "../src/components/FormFields/ButtonComp";

test("should render button with text", async ({ mount }) => {
  const component = await mount(<Button>Click Me</Button>);
  await expect(component).toContainText("Click Me");
});
