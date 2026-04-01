import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'outline' | 'secondary' | 'text';

interface ButtonProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  onClick?: () => void;
  as?: React.ElementType;
  href?: string;
}

const variantStyles = {
  primary: css`
    background: #18181B;
    color: #FFFFFF;
    padding: 12px 28px;
    border-radius: 10px;
    font-weight: 500;
    font-size: 14px;
    transition: background 0.2s ease, transform 0.15s ease;
    &:hover {
      background: #27272A;
      transform: translateY(-1px);
    }
  `,
  outline: css`
    background: transparent;
    color: rgba(0,0,0,0.88);
    padding: 12px 28px;
    border: 1px solid rgba(0,0,0,0.12);
    border-radius: 10px;
    font-weight: 500;
    font-size: 14px;
    transition: border-color 0.2s ease, background 0.2s ease;
    &:hover {
      border-color: rgba(0,0,0,0.25);
      background: rgba(0,0,0,0.02);
    }
  `,
  secondary: css`
    background: #F4F4F5;
    color: rgba(0,0,0,0.88);
    padding: 12px 28px;
    border-radius: 10px;
    font-weight: 500;
    font-size: 14px;
    transition: background 0.2s ease;
    &:hover {
      background: #E4E4E7;
    }
  `,
  text: css`
    background: transparent;
    color: rgba(0,0,0,0.88);
    padding: 0;
    font-weight: 500;
    font-size: 14px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: gap 0.2s ease, color 0.2s ease;
    &:hover {
      gap: 10px;
      color: #7C3AED;
    }
  `,
};

const StyledButton = styled.button<{ $variant: ButtonVariant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  white-space: nowrap;
  ${({ $variant }) => variantStyles[$variant]}
`;

export default function Button({ variant = 'primary', children, onClick, as, href }: ButtonProps) {
  return (
    <StyledButton $variant={variant} onClick={onClick} as={as} href={href}>
      {children}
    </StyledButton>
  );
}
