import styled from "styled-components";

const MenuWrapper = styled.div`
    width: 10rem;

    .menu-item {
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .icon {
            display: flex;
            align-items: center;
            margin-right: 1rem;
            font-size: 1.1rem;
        }
    }
`;

const DefaultLayoutWrapper = styled.div`
    .main-layout {
        min-height: 100vh;

        .dashboard-header{
            background-color: white;
            display: flex;
            justify-content: flex-end;
            align-items: center;

            .notify {
                margin-right: 2rem;
                display: flex;
                align-items: center;
            }
        }

        .logo {
            padding: 2rem 1rem;
            color: white;
            text-align: center;
            font-weight: 600;
            font-size: 1rem;
        }

        .site-layout {
            display: flex;
            flex-direction: column;

            .footer {
                text-align: center;
                background-color: white;
            }
        }
    }
`;

const ContentWrapper = styled.div`
    margin: 1rem 1rem;
    padding: 1.5rem 1rem;
    min-height: 50vh;
    background-color: white;
    border-radius: 6px;
    border-top: 3px solid #1890ff;
    margin-bottom: auto;
`;

export { DefaultLayoutWrapper, ContentWrapper, MenuWrapper };