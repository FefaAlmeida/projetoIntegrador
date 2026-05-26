import Guard from "@/components/guard";

export default function ProtectedLayout({ children }) {
 return <Guard role="ANY">{children}</Guard>;
}
