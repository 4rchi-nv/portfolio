import React from "react";
import { writeFileSync } from "node:fs";
import { ImageResponse } from "next/og.js";

const title = "Arslan Agajanov — React / Next.js Engineer";
const description =
  "React / Next.js engineer building interactive web applications: client-side and realtime logic, PWA, Telegram WebApps and Web3 integrations.";
const personName = "Arslan Agajanov";

const image = new ImageResponse(
  React.createElement(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: "linear-gradient(145deg, #09090b 0%, #18181b 55%, #27272a 100%)",
        color: "#fafafa",
        fontFamily: "system-ui, sans-serif",
      },
    },
    React.createElement(
      "div",
      { style: { display: "flex", alignItems: "center", gap: 16 } },
      React.createElement("div", {
        style: {
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "#a1a1aa",
        },
      }),
      React.createElement(
        "span",
        {
          style: {
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#a1a1aa",
          },
        },
        "Portfolio",
      ),
    ),
    React.createElement(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 } },
      React.createElement(
        "div",
        {
          style: {
            fontSize: 58,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          },
        },
        title,
      ),
      React.createElement(
        "div",
        {
          style: {
            fontSize: 28,
            lineHeight: 1.45,
            color: "#d4d4d8",
          },
        },
        description,
      ),
    ),
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid #3f3f46",
          paddingTop: 28,
        },
      },
      React.createElement(
        "span",
        { style: { fontSize: 24, fontWeight: 600, color: "#e4e4e7" } },
        personName,
      ),
      React.createElement(
        "span",
        {
          style: {
            fontSize: 20,
            color: "#71717a",
            letterSpacing: "0.04em",
          },
        },
        "React · Next.js · TypeScript",
      ),
    ),
  ),
  { width: 1200, height: 630 },
);

const buffer = Buffer.from(await image.arrayBuffer());
writeFileSync(new URL("../public/og-image.png", import.meta.url), buffer);
console.log("Generated public/og-image.png");
