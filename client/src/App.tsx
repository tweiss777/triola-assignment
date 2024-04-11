import { getEventCount, getEvents } from "./services/events.services";
import { useEffect, useRef, useState } from "react";
import { MenuItem } from "./types/MenuItem";
import { PieChartOutlined, DesktopOutlined } from "@ant-design/icons";
import VerticalMenu from "./components/VerticalMenu";
import "./scss/styles.scss";
import { useLoadingContext } from "./contexts/LoadingContext";
import EventsTable from "./components/Table";
import { Row, Col } from "antd";
import { IEvent } from "./types/IEvent";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  const items: MenuItem[] = [
    getItem("dashboard", "/dashboard", <PieChartOutlined />),
    getItem("events", "/events", <DesktopOutlined />),
  ];


    const { setLoading } = useLoadingContext();
    const [events, setEvents] = useState<IEvent[]>([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const totalEvents = useRef<number>(0)
  
    function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group",
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  useEffect(() => {
    async function getData() {
      await fetchData();
    }
    getData();
  },[]);
  async function fetchData() {
    setLoading(true);
    const retrievedEvents = await getEvents(pageNumber, perPage);
    const totalEntries = await getEventCount()
    totalEvents.current = totalEntries
    setEvents(retrievedEvents)
    setLoading(false);
  }

    async function handlePaginationChange(page: number, pageSize: number) {
        setPageNumber(page);
        setPerPage(pageSize);
        await fetchData();
    }

  return (
    <BrowserRouter>  
    <div className="app-container">
      <Row gutter={16}>
        <Col span={4}>
          <VerticalMenu menuItems={items} />
        </Col>
        <Col span={20}>
          <Routes>
            <Route path="/dashboard" element={
                <EventsTable totalEvents={totalEvents.current} onPaginationChange={handlePaginationChange} events={events} />
            } />
            <Route path="/events" element={
                <EventsTable totalEvents={totalEvents.current} onPaginationChange={handlePaginationChange} events={events} />
            } />
          </Routes>
        </Col>
      </Row>
    </div>
    </BrowserRouter>

  );
}

export default App;
