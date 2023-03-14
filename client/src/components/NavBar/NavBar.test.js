import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './index';

describe('Navbar', () => {
  it('should navigate to dashboard when clicking on the "Dashboard" button', () => {
    const { getByText, history } = render(
      <Router>
        <Navbar />
      </Router>
    );

    const dashboardButton = getByText('Dashboard');
    fireEvent.click(dashboardButton);

    expect(history.location.pathname).toBe('/Dashboard');
  });
});