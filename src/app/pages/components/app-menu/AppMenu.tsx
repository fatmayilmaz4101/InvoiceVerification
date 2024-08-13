"use client";

import React from "react";
import { MenuProvider } from "@/layout/context/menucontext";
import AppMenuitem from "./AppMenuItem";
import { AppMenuItem } from "@/types/layout";

const AppMenu = () => {
  const model: AppMenuItem[] = [
    {
      label: "Home",
      items: [{ label: "Invoice Verification", icon: "pi pi-fw pi-home", to: "/" }],
    },
    {
      label: "Tanımlar",
      items: [
        {
          label: "Company Price List",
          icon: "pi pi-turkish-lira",
          to: "/pages/screens/company-price-list",
        },
        {
          label: "Company List",
          icon: "pi pi-building-columns",
          to: "/pages/screens/company-list",
        },
        {
          label: "Article List",
          icon: "pi pi-box",
          to: "/pages/screens/article-list",
        },
      ],
    },
  ];

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item, i) => {
          return !item?.seperator ? (
            <AppMenuitem item={item} root={true} index={i} key={item.label} />
          ) : (
            <li className="menu-separator"></li>
          );
        })}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
