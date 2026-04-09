import { Metadata } from "next";
import { SITE_URL, SOCIAL_LINKS, AUTHOR } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Email Signature",
    description: "Rashid Iqbal's email signature with contact details and current CTA.",
    robots: { index: false, follow: false },
};

export default function SignaturePage() {
    return (
        <div className="min-h-screen bg-zinc-100 flex items-center justify-center p-8">
            <div className="max-w-2xl w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-zinc-900 mb-2">Email Signature</h1>
                    <p className="text-sm text-zinc-500">
                        Copy the HTML below and paste it into your email client&apos;s signature settings.
                    </p>
                </div>

                {/* Preview */}
                <div className="bg-white p-8 border border-zinc-200">
                    <table cellPadding={0} cellSpacing={0} style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", color: "#18181b" }}>
                        <tbody>
                            <tr>
                                <td style={{ paddingRight: "16px", verticalAlign: "top" }}>
                                    <div style={{ width: "48px", height: "48px", backgroundColor: "#f97316", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: "20px", textAlign: "center", lineHeight: "48px" }}>
                                        R
                                    </div>
                                </td>
                                <td style={{ verticalAlign: "top" }}>
                                    <div style={{ fontWeight: "bold", fontSize: "15px", marginBottom: "2px" }}>Rashid Iqbal</div>
                                    <div style={{ fontSize: "12px", color: "#71717a", marginBottom: "8px" }}>Figma &amp; Framer Expert | Chrome Extensions</div>
                                    <div style={{ fontSize: "12px", color: "#71717a", marginBottom: "12px" }}>
                                        <a href={`mailto:${AUTHOR.email}`} style={{ color: "#71717a", textDecoration: "none" }}>{AUTHOR.email}</a>
                                        {" | "}
                                        <a href={SOCIAL_LINKS.calcom} style={{ color: "#f97316", textDecoration: "none", fontWeight: "bold" }}>Book a Call</a>
                                    </div>
                                    {/* CTA Banner */}
                                    <a href={`${SITE_URL}/audit`} style={{ textDecoration: "none" }}>
                                        <div style={{ backgroundColor: "#18181b", color: "white", padding: "10px 16px", fontSize: "12px", fontWeight: "bold", display: "inline-block", borderRadius: "4px" }}>
                                            Get a free website audit → aestho.xyz/audit
                                        </div>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Copyable HTML */}
                <div className="bg-white p-6 border border-zinc-200">
                    <h2 className="text-sm font-bold text-zinc-900 mb-3">HTML Code (copy this)</h2>
                    <textarea
                        readOnly
                        className="w-full h-48 p-4 bg-zinc-50 border border-zinc-200 text-xs font-mono text-zinc-700 resize-none focus:outline-none"
                        value={`<table cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;font-size:14px;color:#18181b">
<tr>
<td style="padding-right:16px;vertical-align:top">
<div style="width:48px;height:48px;background-color:#f97316;border-radius:10px;text-align:center;line-height:48px;color:white;font-weight:bold;font-size:20px">R</div>
</td>
<td style="vertical-align:top">
<div style="font-weight:bold;font-size:15px;margin-bottom:2px">Rashid Iqbal</div>
<div style="font-size:12px;color:#71717a;margin-bottom:8px">Figma &amp; Framer Expert | Chrome Extensions</div>
<div style="font-size:12px;color:#71717a;margin-bottom:12px">
<a href="mailto:${AUTHOR.email}" style="color:#71717a;text-decoration:none">${AUTHOR.email}</a> | <a href="${SOCIAL_LINKS.calcom}" style="color:#f97316;text-decoration:none;font-weight:bold">Book a Call</a>
</div>
<a href="${SITE_URL}/audit" style="text-decoration:none">
<div style="background-color:#18181b;color:white;padding:10px 16px;font-size:12px;font-weight:bold;display:inline-block;border-radius:4px">Get a free website audit → aestho.xyz/audit</div>
</a>
</td>
</tr>
</table>`}
                        onClick={(e) => (e.target as HTMLTextAreaElement).select()}
                    />
                    <p className="text-xs text-zinc-400 mt-2">Click to select all, then copy.</p>
                </div>
            </div>
        </div>
    );
}
