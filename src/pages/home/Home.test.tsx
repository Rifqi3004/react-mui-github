import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "./Home";
import * as api from "../../apis/home.api";

jest.mock("../../apis/home.api");

describe("Home Component", () => {
  beforeEach(() => jest.clearAllMocks());

    it('renders the search input', () => {
      render(<Home />);
      const searchInput = screen.getByPlaceholderText('Search Username');
      expect(searchInput).toBeInTheDocument();
    });

    it('renders the button', () => {
      render(<Home />);
      const searchButton = screen.getByRole('button', { name: 'Search' });
      expect(searchButton).toBeInTheDocument();
    });

    it('change value input', () => {
      render(<Home />);
      const searchInput = screen.getByPlaceholderText('Search Username');
      fireEvent.change(searchInput, { target: { value: 'rifqi3004' } });
      expect(searchInput).toHaveValue('rifqi3004');
    });

  it('get username data', async () => {
    const mockDataUsername = {
      items: [
        {
          login: 'rifqi3004',
          repos_url: 'https://api.github.com/users/rifqi3004/repos',
        },
      ],
    };
    (api.getUsername as jest.Mock).mockResolvedValue(mockDataUsername);

    render(<Home />);
    const searchInput = screen.getByPlaceholderText('Search Username');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(searchInput, { target: { value: 'rifqi3004' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText("rifqi3004")).toBeInTheDocument();
    });
  });

  it('get repository data', async () => {
    const mockDataUsername = {
      items: [
        {
          login: 'rifqi3004',
          repos_url: 'https://api.github.com/users/rifqi3004/repos',
        },
      ],
    };
    const mockDataRepository = [
      {
        name: 'reporifqi3004',
        description: 'Example repository',
        html_url: 'https://github.com/rifqi3004/reporifqi3004',
        stargazers_count: 42,
      },
    ];
    (api.getUsername as jest.Mock).mockResolvedValue(mockDataUsername);
    (api.getRepository as jest.Mock).mockResolvedValue(mockDataRepository);

    render(<Home />);
    const searchInput = screen.getByPlaceholderText('Search Username');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(searchInput, { target: { value: 'rifqi3004' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      screen.getByText("rifqi3004")
    });
    fireEvent.click(screen.getByText("rifqi3004"));
    expect(screen.getByText("reporifqi3004")).toBeInTheDocument();
  });

  it('renders skeleton loaders while loading data', async () => {
    const mockDataUsername = {
      items: [
        {
          login: 'rifqi3004',
          repos_url: 'https://api.github.com/users/rifqi3004/repos',
        },
      ],
    };
    const mockDataRepository = [
      {
        name: 'reporifqi3004',
        description: 'Example repository',
        html_url: 'https://github.com/rifqi3004/reporifqi3004',
        stargazers_count: 42,
      },
    ];
    (api.getUsername as jest.Mock).mockResolvedValue(mockDataUsername);
    (api.getRepository as jest.Mock).mockResolvedValue(mockDataRepository);

    render(<Home />);
    const searchInput = screen.getByPlaceholderText('Search Username');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(searchInput, { target: { value: 'rifqi3004' } });
    fireEvent.click(searchButton);

    expect(screen.getAllByRole('skeleton')).toHaveLength(5);
    await screen.findByText("rifqi3004")
  });

  it("renders not found", async () => {
    (api.getUsername as jest.Mock).mockRejectedValue("not found");

    render(<Home />);
    const searchInput = screen.getByPlaceholderText("Search Username");
    const searchButton = screen.getByRole("button", { name: "Search" });

    fireEvent.change(searchInput, { target: { value: "rifqi3004" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText("Username not found.")).toBeInTheDocument();
    });
  });
});
