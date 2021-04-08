import React from 'react';
import Spinner from '../spinner/spinner';

interface WithLoadingHOCProps {
  isLoading: boolean;
}

/**
 * HOC that renders a spinner for data loading
 * @param {React.Component} Component
 * @return Component or Spinner
 */
// eslint-disable-next-line @typescript-eslint/ban-types
const withSpinnerHOC = <P extends object>(Component: React.ComponentType<P>) =>
  class WithLoadingHOC extends React.Component<P & WithLoadingHOCProps> {
    render() {
      const { isLoading, ...props } = this.props;
      return isLoading ? <Spinner /> : <Component {...(props as P)} />;
    }
  };

export default withSpinnerHOC;
