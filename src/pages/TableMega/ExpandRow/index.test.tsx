import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TableMegaExpandRowPage } from "./";

type Any = any;

const mockMakeData = vi.fn();
const mockTranslate = vi.fn((key: string) => key);

vi.mock("~/utils", () => ({
  makeData: {
    person: (count: number) => mockMakeData(count),
  },
}));

vi.mock("~/hooks", async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return {
    ...actual,
    useColumns: () => ({
      columns: [
        { accessorKey: "name", header: "Name" },
        { accessorKey: "email", header: "Email" },
      ],
    }),
    useTranslation: () => ({
      translate: mockTranslate,
    }),
  };
});

vi.mock("~/components", () => ({
  Section: ({ children, title }: Any) => (
    <div data-testid="section">
      <h2>{title}</h2>
      {children}
    </div>
  ),
  Button: ({ onClick, endIcon }: Any) => (
    <button onClick={onClick} data-testid="expand-button">
      {endIcon}
    </button>
  ),
}));

vi.mock("lucide-react", () => ({
  ChevronDownIcon: () => <span>Down</span>,
  ChevronUpIcon: () => <span>Up</span>,
}));

const mockOnCancel = vi.fn();
const mockOnSave = vi.fn();

vi.mock("~/components/ExpandRowUpdateData", () => ({
  ExpandRowUpdateData: ({ onCancel, onSave }: Any) => (
    <div data-testid="expand-row-update-data">
      <button
        data-testid="cancel-button"
        onClick={() => {
          const mockToggle = vi.fn();
          onCancel({ row: { getToggleExpandedHandler: () => mockToggle } });
          mockOnCancel();
        }}
      >
        Cancel
      </button>
      <button
        data-testid="cancel-null-row"
        onClick={() => {
          onCancel({ row: null });
        }}
      >
        Cancel Null
      </button>
      <button
        data-testid="save-button"
        onClick={() => {
          const mockToggle = vi.fn();
          onSave({
            row: { index: 0, getToggleExpandedHandler: () => mockToggle },
            dataToUpdate: { name: "Updated Name" },
          });
          mockOnSave();
        }}
      >
        Save
      </button>
      <button
        data-testid="save-null-row"
        onClick={() => {
          onSave({
            row: null,
            dataToUpdate: { name: "Updated Name" },
          });
        }}
      >
        Save Null
      </button>
    </div>
  ),
}));

vi.mock("~/packages/TableMega", () => ({
  Root: ({ children, columns }: Any) => (
    <div data-testid="table-mega-root">
      <div data-testid="collapsed-cell">
        {columns[0].cell({
          row: {
            getIsExpanded: () => false,
            getToggleExpandedHandler: () => vi.fn(),
          },
        })}
      </div>
      <div data-testid="expanded-cell">
        {columns[0].cell({
          row: {
            getIsExpanded: () => true,
            getToggleExpandedHandler: () => vi.fn(),
          },
        })}
      </div>
      {children}
    </div>
  ),
  Table: ({ children }: Any) => <div data-testid="table-mega-table">{children}</div>,
  Thead: {
    Sort: () => <div data-testid="thead-sort" />,
  },
  Tbody: ({ children }: Any) => <div data-testid="tbody">{children}</div>,
  Rows: {
    Default: {
      Expand: () => <div data-testid="rows-default-expand" />,
    },
  },
  OnExpanded: ({ children }: Any) => <div data-testid="on-expanded">{children}</div>,
}));

describe("TableMegaExpandRowPage", () => {
  const mockPersonData: Any[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    mockMakeData.mockReturnValue(mockPersonData);
  });

  it("should render page with expand buttons showing correct icons based on expanded state", () => {
    render(<TableMegaExpandRowPage />);

    expect(screen.getByTestId("section")).toBeInTheDocument();
    const collapsedCell = screen.getByTestId("collapsed-cell");
    const expandedCell = screen.getByTestId("expanded-cell");

    expect(within(collapsedCell).getByText("Down")).toBeInTheDocument();
    expect(within(expandedCell).getByText("Up")).toBeInTheDocument();
  });

  it("should handle cancel action including null row guard", async () => {
    const user = userEvent.setup();
    render(<TableMegaExpandRowPage />);

    const cancelButton = screen.getByTestId("cancel-button");
    await user.click(cancelButton);
    expect(mockOnCancel).toHaveBeenCalled();

    const cancelNullButton = screen.getByTestId("cancel-null-row");
    await user.click(cancelNullButton);
  });

  it("should handle save action including null row guard", async () => {
    const user = userEvent.setup();
    render(<TableMegaExpandRowPage />);

    const saveButton = screen.getByTestId("save-button");
    await user.click(saveButton);
    expect(mockOnSave).toHaveBeenCalled();

    const saveNullButton = screen.getByTestId("save-null-row");
    await user.click(saveNullButton);
  });
});
