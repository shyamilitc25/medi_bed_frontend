import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from '../components/Layout/Sidebar';
import { sidebarRouteList } from '../routes/routeList';

describe('Sidebar Component', () => {
  test('renders the Sidebar when isOpen is true', () => {
    render(
      <Router>
        <Sidebar isOpen={true} />
      </Router>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    sidebarRouteList.forEach(route => {
      expect(screen.getByText(route.name)).toBeInTheDocument();
    });
  });

  test('does not render the Sidebar when isOpen is false', () => {
    render(
      <Router>
        <Sidebar isOpen={false} />
      </Router>
    );
    const sidebarElement = screen.getByRole('navigation').parentElement;
    expect(sidebarElement).toHaveClass('-translate-x-full');
  });

  test('renders the correct number of links', () => {
    render(
      <Router>
        <Sidebar isOpen={true} />
      </Router>
    );
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(sidebarRouteList.length + 1); // +1 for the Home link
  });

  test('applies the correct classes based on isOpen prop', () => {
    const { rerender } = render(
      <Router>
        <Sidebar isOpen={true} />
      </Router>
    );
    let sidebarElement = screen.getByRole('navigation').parentElement;
    expect(sidebarElement).toHaveClass('translate-x-0');

    rerender(
      <Router>
        <Sidebar isOpen={false} />
      </Router>
    );
    sidebarElement = screen.getByRole('navigation').parentElement;
    expect(sidebarElement).toHaveClass('-translate-x-full');
  });
});
