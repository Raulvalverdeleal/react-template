import { Component, ReactNode, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(_: Error): ErrorBoundaryState {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('ErrorBoundary caught an error', error, errorInfo);
		// logErrorToMyService(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return this.props.fallback ?? <h1>Something went wrong.</h1>;
		}

		return this.props.children;
	}
}
