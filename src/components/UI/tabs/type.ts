export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultActiveTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
  tabClassName?: string;
  contentClassName?: string;
}
