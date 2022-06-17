import { render } from "@testing-library/react";
import { ChatsTeardrop } from "phosphor-react";

import { Feedget } from "./feedget";

const options = {
  BUG: {
    title: "Problema",
    icon: () => (
      <img
        src="https://images.unsplash.com/photo-1654235444147-2e45a5a9f020?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        alt="A BUG icon option"
      />
    ),
  },
  IDEA: {
    title: "Ideia",
    icon: () => (
      <img
        src="https://images.unsplash.com/photo-1654235444147-2e45a5a9f020?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        alt="A IDEA icon option"
      />
    ),
  },
  OTHER: {
    title: "Outro",
    icon: () => (
      <img
        src="https://images.unsplash.com/photo-1654235444147-2e45a5a9f020?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        alt="A THOUGHT icon option"
      />
    ),
  },
};

describe("Rendering", () => {
  it("should render Feedget component without crashing", () => {
    const { container } = render(
      <Feedget options={options} onSent={() => {}} />
    );

    const feedgetBubbleIcon = container.querySelector("#feedget-bubble-icon");

    expect(container).toBeInTheDocument();
    expect(feedgetBubbleIcon).toBeInTheDocument();
  });

  it("should be able to render the Bubble Icon component using a icon prop", () => {
    const { container } = render(
      <Feedget
        Icon={<ChatsTeardrop id="custom-bubble-icon" />}
        options={options}
        onSent={() => {}}
      />
    );

    const customBubbleIcon = container.querySelector("#custom-bubble-icon");

    expect(customBubbleIcon).toBeInTheDocument();
  });
});
