import { useEffect, useState } from 'react';
import { Button, Nav, NavItem, Collapse } from 'reactstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface NavigationItem {
  title: string;
  href: string;
  icon: string;
  subMenu?: NavigationItem[];
}

const navigation: NavigationItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'bi bi-speedometer2',
  },
  {
    title: 'Data Table',
    href: '/datatable',
    icon: 'bi bi-list',
    subMenu: [
      {
        title: 'UI Side',
        href: '/tableui',
        icon: 'bi bi-table',
      },
      {
        title: 'Server & UI Side ',
        href: '/tableserverui',
        icon: 'bi bi-table',
      },
    ],
  },
  // {
  //   title: "Analytics",
  //   href: "/analytics",
  //   icon: "bi bi-bar-chart-line-fill",
  // },
  // {
  //   title: "Reports",
  //   href: "/reports",
  //   icon: "bi bi-paperclip",
  //   subMenu: [
  //     {
  //       title: "Report 1",
  //       href: "/reports/report1",
  //       icon: "bi bi-file-earmark-text",
  //     },
  //     {
  //       title: "Report 2",
  //       href: "/reports/report2",
  //       icon: "bi bi-file-earmark-text",
  //     },
  //   ],
  // },
  // {
  //   title: "Products",
  //   href: "/products",
  //   icon: "bi bi-gift-fill",
  //   subMenu: [
  //     {
  //       title: "Product 1",
  //       href: "/products/product1",
  //       icon: "bi bi-bag",
  //     },
  //     {
  //       title: "Product 2",
  //       href: "/products/product2",
  //       icon: "bi bi-bag",
  //     },
  //   ],
  // },
];

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<{ [key: number]: boolean }>({});
  const toggleSubMenu = (index: number) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const curl = useRouter();
  const location = curl.pathname;
  useEffect(() => {
    const savedState = localStorage.getItem('submenuState');
    if (savedState) {
      setIsOpen(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('submenuState', JSON.stringify(isOpen));
  }, [isOpen]);

  return (
    <div className="p-3">
      <div className="d-flex">
        <div className="sidebar-heading text-center py-2 primary-text fs-2 fw-bold text-uppercase">
          AMWEBTECH
        </div>
      </div>
      <div className="pt-1 mt-1">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              {navi.subMenu ? (
                <>
                  <div
                    className={
                      isOpen[index]
                        ? 'nav-link text-primary py-3'
                        : 'nav-link text-secondary py-3'
                    }
                    onClick={() => toggleSubMenu(index)}
                  >
                    <i className={navi.icon}></i>
                    <span className="ms-3 d-inline-block">{navi.title}</span>
                    &nbsp;
                    <i
                      className={
                        isOpen[index]
                          ? 'bi bi-chevron-up ms-auto md-auto'
                          : 'bi bi-chevron-down ms-auto md-auto'
                      }
                    ></i>
                  </div>
                  <Collapse isOpen={isOpen[index]}>
                    <Nav vertical>
                      {navi.subMenu.map((subNavItem, subIndex) => (
                        <NavItem key={subIndex} className="sidenav-bg">
                          <Link href={subNavItem.href}>
                            <div
                              className={
                                location === subNavItem.href
                                  ? 'text-primary nav-link py-3'
                                  : 'nav-link text-secondary py-3'
                              }
                              style={{ marginLeft: '10px' }}
                            >
                              <i className={subNavItem.icon}></i>
                              <span className="ms-3 d-inline-block">
                                {subNavItem.title}
                              </span>
                            </div>
                          </Link>
                        </NavItem>
                      ))}
                    </Nav>
                  </Collapse>
                </>
              ) : (
                <Link href={navi.href}>
                  <div
                    className={
                      location === navi.href
                        ? 'text-primary nav-link py-3'
                        : 'nav-link text-secondary py-3'
                    }
                    // style={{ marginLeft: "8px" }}
                  >
                    <i className={navi.icon}></i>
                    <span className="ms-3 d-inline-block">{navi.title}</span>
                  </div>
                </Link>
              )}
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
