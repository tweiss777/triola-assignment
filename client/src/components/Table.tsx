import { IEvent } from "../types/IEvent";
import { Table, Pagination, TableProps } from "antd";
import { useLoadingContext } from "../hooks/useLoadingContext";

type IProps = {
    events: IEvent[]
    onPaginationChange: (page: number, pageSize: number) => void,
    totalEvents: number,
    perPage:number
}


export default function EventsTable(props: IProps) {

    const { loading } = useLoadingContext()
  function onColClick(record: IEvent) {}

     async function onPageChange(page: number, pageSize: number) {
       props.onPaginationChange(page, pageSize) 
    }
  const columns: TableProps<IEvent>["columns"] = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      onCell: (record, _row) => {
        return {
          onClick: () => onColClick(record),
        };
      },
    },

    {
      title: "title",
      dataIndex: "title",
      key: "title",

      onCell: (record, _row) => {
        return {
          onClick: () => onColClick(record),
        };
      },
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
      onCell: (record, _row) => {
        return {
          onClick: () => onColClick(record),
        };
      },
    },
    {
      title: "date",
      dataIndex: "date",
      key: "date",
      onCell: (record, _row) => {
        return {
          onClick: () => onColClick(record),
        };
      },
    },

    {
      title: "location",
      dataIndex: "location",
      key: "location",
      onCell: (record, _row) => {
        return {
          onClick: () => onColClick(record),
        };
      },
    },
  ];

  return (
    <div>
      <Table
        loading={loading}
        scroll={{ x: true }}
        pagination={false}
        size={"large"}
        columns={columns}
        dataSource={props.events}
        bordered={true}
      />
      <Pagination
        total={props.totalEvents}
        pageSize={props.perPage}
        onChange={onPageChange}
      />
    </div>
  );
}
