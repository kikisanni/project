import { Link } from "react-router-dom";

export default function Copyright() {
  return (
    <div className="flex text-sm mt-8 justify-around bg-gray-100 py-4">
      <h2 className="">Dublin City University</h2>
      <h2 className="">Computer Applications Final Year Project</h2>
      <h2 className="">© 2024 Okikiola Sanni & Effa Al Bulushi</h2>
      <div className="flex gap-x-3">
        <Link
          to="/guidelines"
          className="underline underline-offset-8 decoration-purple-400"
        >
          Community Guidelines
        </Link>
        <h2> | </h2>
        <Link
          to="/terms"
          className="underline underline-offset-8 decoration-purple-400"
        >
          Terms
        </Link>
      </div>
    </div>
  );
}
