import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Table } from "~/packages/Table";
import { TPerson } from "~/types";
import { TraditionalExpandRowPage } from "./";

// Mock dependencies
const mockMakeData = vi.fn();
const mockTranslate = vi.fn((key: string) => key);

vi.mock("~/utils", () => ({
  makeData: {
    person: (count: number) => mockMakeData(count),
  },
}));

vi.mock("~/hooks", () => ({
  useColumns: () => ({
    columns: [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
    ],
  }),
  useTranslation: () => ({
    translate: mockTranslate,
  }),
}));

vi.mock("~/components", () => ({
  Section: ({ children, title }: any) => (
    <div data-testid="section">
      <h2>{title}</h2>
      {children}
    </div>
  ),
  Button: ({ onClick, endIcon }: any) => (
    <button onClick={onClick} data-testid="expand-button">
      {endIcon}
    </button>
  ),
}));

vi.mock("~/packages/Table");

const mockOnCancel = vi.fn();
const mockOnSave = vi.fn();

vi.mock("~/components/ExpandRowUpdateData", () => ({
  ExpandRowUpdateData: ({ row, onCancel, onSave }: any) => (
    <div data-testid="expand-row-update-data">
      <span>Row index: {row?.index}</span>
      <button
        data-testid="cancel-button"
        onClick={() => {
          mockOnCancel();
          onCancel({ row });
        }}
      >
        Cancel
      </button>
      <button
        data-testid="save-button"
        onClick={() => {
          mockOnSave();
          onSave({
            row,
            dataToUpdate: { name: "Updated Name", email: "updated@email.com" },
          });
        }}
      >
        Save
      </button>
    </div>
  ),
}));

vi.mock("lucide-react", () => ({
  ChevronDownIcon: () => <span>Down</span>,
  ChevronUpIcon: () => <span>Up</span>,
}));

describe("TraditionalExpandRowPage - expandRow render", () => {
  const mockPersonData: TPerson[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      age: 30,
      country: "USA",
      birthday: "1995-01-01",
      status: "active",
      friends: [],
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      age: 25,
      country: "Canada",
      birthday: "2000-05-15",
      status: "inactive",
      friends: [],
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    mockMakeData.mockReturnValue(mockPersonData);
  });

  it("should render ExpandRowUpdateData component", () => {
    vi.mocked(Table).mockImplementation(({ expandRow, data }: any) => {
      const mockRow = {
        index: 0,
        getToggleExpandedHandler: vi.fn(() => vi.fn()),
        original: data[0],
      };

      return (
        <div data-testid="table">
          <div data-testid="expand-row-render">
            {expandRow?.render(mockRow)}
          </div>
        </div>
      );
    });
    render(<TraditionalExpandRowPage />);

    expect(screen.getByTestId("expand-row-update-data")).toBeInTheDocument();
  });

  it("should call toggle handler when cancel button is clicked", async () => {
    const user = userEvent.setup();
    render(<TraditionalExpandRowPage />);

    const cancelButton = screen.getByTestId("cancel-button");
    await user.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it("should update data when save button is clicked", async () => {
    const user = userEvent.setup();
    render(<TraditionalExpandRowPage />);

    const saveButton = screen.getByTestId("save-button");

    await user.click(saveButton);

    expect(mockOnSave).toHaveBeenCalled();
  });

  it("should pass correct row to ExpandRowUpdateData", () => {
    render(<TraditionalExpandRowPage />);

    expect(screen.getByText("Row index: 0")).toBeInTheDocument();
  });

  it("should render expand button with correct icon based on expanded state", () => {
    const mockGetToggleHandler = vi.fn(() => vi.fn());

    // Mock Table to execute cell function
    vi.mocked(Table).mockImplementation(({ columns }: any) => {
      const expandColumn = columns[0];

      // Test with collapsed state
      const collapsedRow = {
        getIsExpanded: () => false,
        getToggleExpandedHandler: mockGetToggleHandler,
      };

      const collapsedCell = expandColumn.cell({ row: collapsedRow });

      // Test with expanded state
      const expandedRow = {
        getIsExpanded: () => true,
        getToggleExpandedHandler: mockGetToggleHandler,
      };

      const expandedCell = expandColumn.cell({ row: expandedRow });

      return (
        <div data-testid="table">
          <div data-testid="collapsed-cell">{collapsedCell}</div>
          <div data-testid="expanded-cell">{expandedCell}</div>
        </div>
      );
    });

    render(<TraditionalExpandRowPage />);

    const collapsedCell = screen.getByTestId("collapsed-cell");
    const expandedCell = screen.getByTestId("expanded-cell");

    // Check ChevronDownIcon is rendered when collapsed
    expect(within(collapsedCell).getByText("Down")).toBeInTheDocument();

    // Check ChevronUpIcon is rendered when expanded
    expect(within(expandedCell).getByText("Up")).toBeInTheDocument();

    // Verify button props
    expect(
      within(collapsedCell).getByTestId("expand-button")
    ).toBeInTheDocument();
    expect(
      within(expandedCell).getByTestId("expand-button")
    ).toBeInTheDocument();
  });
});
