import { Breadcrumbs } from "@mui/material";
import Link from "next/link";
import { Container } from "@mui/material";

export default function Breadcrumb() {
    return (
        <Breadcrumbs>
            <Link href="/" className="breadcrumbs_link">
                HOME
            </Link>
            <Link href="/contact" className="breadcrumbs_link">
                CONTACT
            </Link>
        </Breadcrumbs>

    );
}
