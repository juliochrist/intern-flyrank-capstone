"use client";

import {
  createContext,
  useCallback,
  useContext,
  useId,
  useRef,
  useState,
} from "react";
import type { KeyboardEvent } from "react";

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  baseId: string;
  tabsRef: React.MutableRefObject<Map<string, HTMLButtonElement>>;
  orientation: "horizontal" | "vertical";
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error("Tabs compound components must be used inside <Tabs>");
  }
  return ctx;
}

interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  orientation?: "horizontal" | "vertical";
}

export function Tabs({
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  orientation = "horizontal",
}: TabsProps) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const baseId = useId();
  const tabsRef = useRef(new Map<string, HTMLButtonElement>());

  const activeValue = isControlled ? controlledValue : internalValue;

  const handleValueChange = useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [isControlled, onValueChange],
  );

  return (
    <TabsContext.Provider
      value={{
        value: activeValue,
        onValueChange: handleValueChange,
        baseId,
        tabsRef,
        orientation,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
}

interface TabsListProps {
  children: React.ReactNode;
  "aria-label"?: string;
  className?: string;
}

export function TabsList({ children, "aria-label": ariaLabel, className = "" }: TabsListProps) {
  const { baseId, orientation } = useTabsContext();

  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      aria-label={ariaLabel ?? "Tabs"}
      id={`${baseId}-tablist`}
      className={`flex ${orientation === "vertical" ? "flex-col" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

interface TabsTabProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export function TabsTab({ value, children, disabled = false, className = "" }: TabsTabProps) {
  const { value: activeValue, onValueChange, baseId, tabsRef, orientation } = useTabsContext();
  const isSelected = activeValue === value;

  const tabId = `${baseId}-tab-${value}`;
  const panelId = `${baseId}-panel-${value}`;

  const findNextEnabled = useCallback(
    (current: HTMLButtonElement, direction: 1 | -1): HTMLButtonElement | null => {
      const allTabs = Array.from(tabsRef.current.entries());
      const currentIndex = allTabs.findIndex(([, ref]) => ref === current);
      if (currentIndex === -1) return null;

      let offset = direction;
      for (let i = 0; i < allTabs.length; i++) {
        const idx = (currentIndex + offset + allTabs.length) % allTabs.length;
        const [, ref] = allTabs[idx];
        if (ref && !ref.disabled) return ref;
        offset += direction;
      }
      return null;
    },
    [tabsRef],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      const current = e.currentTarget;

      if (orientation === "horizontal") {
        switch (e.key) {
          case "ArrowLeft": {
            e.preventDefault();
            const prev = findNextEnabled(current, -1);
            prev?.focus();
            prev?.click();
            break;
          }
          case "ArrowRight": {
            e.preventDefault();
            const next = findNextEnabled(current, 1);
            next?.focus();
            next?.click();
            break;
          }
        }
      } else {
        switch (e.key) {
          case "ArrowUp": {
            e.preventDefault();
            const prev = findNextEnabled(current, -1);
            prev?.focus();
            prev?.click();
            break;
          }
          case "ArrowDown": {
            e.preventDefault();
            const next = findNextEnabled(current, 1);
            next?.focus();
            next?.click();
            break;
          }
        }
      }

      switch (e.key) {
        case "Home": {
          e.preventDefault();
          const allTabs = Array.from(tabsRef.current.values());
          const first = allTabs.find((ref) => ref && !ref.disabled);
          first?.focus();
          first?.click();
          break;
        }
        case "End": {
          e.preventDefault();
          const allTabs = Array.from(tabsRef.current.values());
          const last = allTabs.reverse().find((ref) => ref && !ref.disabled);
          last?.focus();
          last?.click();
          break;
        }
      }
    },
    [orientation, findNextEnabled, tabsRef],
  );

  return (
    <button
      ref={(el) => {
        if (el) {
          tabsRef.current.set(value, el);
        } else {
          tabsRef.current.delete(value);
        }
      }}
      role="tab"
      id={tabId}
      aria-selected={isSelected}
      aria-controls={panelId}
      tabIndex={isSelected ? 0 : -1}
      disabled={disabled}
      onClick={() => onValueChange(value)}
      onKeyDown={handleKeyDown}
      className={`px-4 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary ${
        isSelected
          ? "border-b-2 border-primary text-foreground"
          : "border-b-2 border-transparent text-muted-foreground hover:border-primary/30 hover:text-muted"
      } ${disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer"} ${className}`}
    >
      {children}
    </button>
  );
}

interface TabsPanelProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function TabsPanel({ value, children, className = "" }: TabsPanelProps) {
  const { value: activeValue, baseId } = useTabsContext();
  const isSelected = activeValue === value;

  const tabId = `${baseId}-tab-${value}`;
  const panelId = `${baseId}-panel-${value}`;

  if (!isSelected) return null;

  return (
    <div
      role="tabpanel"
      id={panelId}
      aria-labelledby={tabId}
      tabIndex={0}
      className={`mt-4 text-sm leading-relaxed text-[#D0D0E0] outline-none ${className}`}
    >
      {children}
    </div>
  );
}
