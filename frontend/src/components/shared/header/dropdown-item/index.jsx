"use client";

export default function DropdownItem({
  href,
  label,
  icon,
  onClick,
  as = "a",
  danger = false,
}) {
  const Tag = as;
  return (
    <li className="lh-di">
      <Tag
        {...(as === "a" ? { href } : { type: "button" })}
        role="menuitem"
        className={`lh-di__link ${danger ? "is-danger" : ""}`}
        onClick={onClick}
      >
        {icon && <i className={`bi ${icon} lh-di__icon`} aria-hidden="true" />}
        <span className="lh-di__label">{label}</span>
        <i
          className="bi bi-arrow-up-right lh-di__arrow"
          aria-hidden="true"
        />
      </Tag>
      <style jsx>{`
        :global(.lh-di__list),
        :global(.lh-di) {
          list-style: none !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        :global(.lh-di__list) {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0;
          width: 100%;
        }
        :global(.lh-di) {
          display: block;
          width: 100%;
          box-sizing: border-box;
        }
        :global(.lh-di__link) {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          box-sizing: border-box;
          padding: 10px 14px;
          border-radius: 10px;
          background: transparent;
          border: 0;
          text-align: left;
          text-decoration: none;
          color: rgba(255, 255, 255, 0.82);
          font: inherit;
          font-weight: 500;
          font-size: 0.88rem;
          letter-spacing: 0.1px;
          cursor: pointer;
          transition: background 200ms ease, color 200ms ease;
        }
        :global(.lh-di__link:hover) {
          background: rgba(254, 189, 23, 0.14);
          color: #fff;
        }
        :global(.lh-di__link.is-danger) {
          color: rgba(255, 120, 120, 0.85);
        }
        :global(.lh-di__link.is-danger:hover) {
          background: rgba(220, 53, 69, 0.14);
          color: #ff7b7b;
        }
        :global(.lh-di__icon) {
          color: #febd17;
          font-size: 0.95rem;
          flex-shrink: 0;
        }
        :global(.lh-di__link.is-danger .lh-di__icon) {
          color: #ff7b7b;
        }
        :global(.lh-di__label) {
          flex: 1;
          min-width: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        :global(.lh-di__arrow) {
          color: #febd17;
          font-size: 0.72rem;
          opacity: 0;
          transform: translateX(-4px);
          transition: opacity 200ms ease, transform 200ms ease;
          flex-shrink: 0;
        }
        :global(.lh-di__link.is-danger .lh-di__arrow) {
          color: #ff7b7b;
        }
        :global(.lh-di__link:hover .lh-di__arrow) {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>
    </li>
  );
}
