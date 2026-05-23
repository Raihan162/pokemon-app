import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SearchInput } from "@/shared/ui/SearchInput";

describe("SearchInput", () => {
  it("calls onChange and onSearch when input changes", () => {
    const handleChange = vi.fn();
    const handleSearch = vi.fn();

    render(<SearchInput onChange={handleChange} onSearch={handleSearch} />);

    const input = screen.getByPlaceholderText("Search Pokemon, Move, Ability etc");
    fireEvent.change(input, { target: { value: "Pikachu" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleSearch).toHaveBeenCalledTimes(1);
    expect(handleSearch).toHaveBeenCalledWith("Pikachu");
  });
});
