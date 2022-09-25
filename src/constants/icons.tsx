export const SliderIcon = function ({ rotate }: { rotate: number }) {
  return (
    <span
      role="img"
      aria-label="user"
      className="anticon anticon-user"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.99976 3C6.99976 2.44772 7.44747 2 7.99976 2H13.9998C14.552 2 14.9998 2.44772 14.9998 3C14.9998 3.55228 14.552 4 13.9998 4H7.99976C7.44747 4 6.99976 3.55228 6.99976 3Z"
          fill="#ABACB2"
        />
        <path
          d="M7 13C7 12.4477 7.44772 12 8 12H14C14.5523 12 15 12.4477 15 13C15 13.5523 14.5523 14 14 14H8C7.44772 14 7 13.5523 7 13Z"
          fill="#ABACB2"
        />
        <path
          d="M3 8C3 7.44771 3.44772 7 4 7H14C14.5523 7 15 7.44771 15 8C15 8.55228 14.5523 9 14 9H4C3.44772 9 3 8.55228 3 8Z"
          fill="#ABACB2"
        />
        <path
          d="M3.72812 5.09386L1.01173 7.21132C0.498127 7.61168 0.498127 8.38832 1.01173 8.78868L3.72812 10.9061C4.05647 11.1621 4.53552 10.9281 4.53552 10.5118L4.53552 5.4882C4.53552 5.07187 4.05647 4.8379 3.72812 5.09386Z"
          fill="#ABACB2"
        />
      </svg>
    </span>
  );
};
