"use client";

import AppMenu from "@/components/app-menu/AppMenu";
import { LayoutContext } from "@/layout/context/layoutcontext";
import { AppTopbarRef, LayoutState } from "@/types/layout";
import { useContext, useEffect, useRef } from "react";
import { useEventListener } from "primereact/hooks";
import { classNames } from "primereact/utils";
import AppTopbar from "@/components/app-topbar/AppTopbar";
import AppFooter from "@/components/app-footer/AppFooter";
import { usePathname, useSearchParams } from 'next/navigation';
export default function Home() {
  const { layoutConfig, layoutState, setLayoutState } =
    useContext(LayoutContext);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const topbarRef = useRef<AppTopbarRef>(null);

  const [bindMenuOutsideClickListener, unbindMenuOutsideClickListener] =
    useEventListener({
      type: "click",
      listener: (event: Event) => {
        const isOutsideClicked = !(
          sidebarRef.current?.isSameNode(event.target as Node) ||
          sidebarRef.current?.contains(event.target as Node) ||
          topbarRef.current?.menubutton?.isSameNode(event.target as Node) ||
          topbarRef.current?.menubutton?.contains(event.target as Node)
        );

        if (isOutsideClicked) {
          hideMenu();
        }
      },
    });
  const [
    bindProfileMenuOutsideClickListener,
    unbindProfileMenuOutsideClickListener,
  ] = useEventListener({
    type: "click",
    listener: (event: Event) => {
      const isOutsideClicked = !(
        topbarRef.current?.topbarmenu?.isSameNode(event.target as Node) ||
        topbarRef.current?.topbarmenu?.contains(event.target as Node) ||
        topbarRef.current?.topbarmenubutton?.isSameNode(event.target as Node) ||
        topbarRef.current?.topbarmenubutton?.contains(event.target as Node)
      );

      if (isOutsideClicked) {
        hideProfileMenu();
      }
    },
  });
  const hideProfileMenu = () => {
    setLayoutState((prevLayoutState: LayoutState) => ({
      ...prevLayoutState,
      profileSidebarVisible: false,
    }));
    unbindProfileMenuOutsideClickListener();
  };

  const hideMenu = () => {
    setLayoutState((prevLayoutState: LayoutState) => ({
      ...prevLayoutState,
      overlayMenuActive: false,
      staticMenuMobileActive: false,
      menuHoverActive: false,
    }));
    unbindMenuOutsideClickListener();
    unblockBodyScroll();
  };

  const unblockBodyScroll = (): void => {
    if (document.body.classList) {
      document.body.classList.remove("blocked-scroll");
    } else {
      document.body.className = document.body.className.replace(
        new RegExp(
          "(^|\\b)" + "blocked-scroll".split(" ").join("|") + "(\\b|$)",
          "gi"
        ),
        " "
      );
    }
  };
  const containerClass = classNames("layout-wrapper", {
    "layout-overlay": layoutConfig.menuMode === "overlay",
    "layout-static": layoutConfig.menuMode === "static",
    "layout-static-inactive":
      layoutState.staticMenuDesktopInactive &&
      layoutConfig.menuMode === "static",
    "layout-overlay-active": layoutState.overlayMenuActive,
    "layout-mobile-active": layoutState.staticMenuMobileActive,
    "p-input-filled": layoutConfig.inputStyle === "filled",
    "p-ripple-disabled": !layoutConfig.ripple,
  });
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
      hideMenu();
      hideProfileMenu();
  }, [pathname, searchParams]);

  const blockBodyScroll = (): void => {
    if (document.body.classList) {
        document.body.classList.add('blocked-scroll');
    } else {
        document.body.className += ' blocked-scroll';
    }
};

  useEffect(() => {
    if (layoutState.overlayMenuActive || layoutState.staticMenuMobileActive) {
      bindMenuOutsideClickListener();
    }

    layoutState.staticMenuMobileActive && blockBodyScroll();
  }, [layoutState.overlayMenuActive, layoutState.staticMenuMobileActive]);

  return (
    <>
      <div className={containerClass}>
        <AppTopbar ref={topbarRef} />

        <div ref={sidebarRef} className="layout-sidebar">
          <AppMenu />
        </div>
        <div className="layout-main-container">
          <AppFooter />
        </div>
      </div>
    </>
  );
}
