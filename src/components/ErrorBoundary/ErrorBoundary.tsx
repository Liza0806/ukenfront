import React, { Component, ReactNode } from "react";
import usik from "../../assets/usik.png";
import cls from "./ErrorBoundary.module.scss";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{ textAlign: "center", padding: "20px", color: "red" }}
          className={cls.errorWrapper}
        >
          <h1>Помилка при завантаженні </h1>
          <p>Спробуйте обновити сторінку</p>
          <img src={usik} alt="Loading..." className={cls.error} />
        </div>
      );
    }

    return this.props.children;
  }
}
