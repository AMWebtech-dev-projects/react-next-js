import React from "react";
import { Container } from "reactstrap";
import Header from "./header/Header";
import Sidebar from "./sidebar/vertical/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

const FullLayout = ({ children }: childrenType) => {
 
  const open = useSelector((state: RootState) => state.Toggle);
  return (
    <main>
      <div className="pageWrapper d-md-block d-lg-flex">
        {!open?.open ? (
          ""
        ) : (
          <aside
            className={`sidebarArea shadow bg-white ${
              !open.open ? "" : "showSidebar"
            }`}
          >
            <Sidebar />
          </aside>
        )}

        <div
          className={`contentArea ${
            open?.open ? "marginLeft260" : "marginLeft0"
          }`}
        >
          {/********header**********/}
          <Header />

          {/********Middle Content**********/}
          <Container className="p-4 wrapper" fluid>
            <div>{children}</div>
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
