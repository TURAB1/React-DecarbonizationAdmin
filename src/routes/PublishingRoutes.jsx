// src/Routes/PublishingRoutes.js
import Power from '../publishing/Power/Power';
import Pilot from '../publishing/Pilot/Pilot';
import Test from '../publishing/Test/Test';
import List from '../publishing/List/List';
import GraphType1 from '../publishing/GraphType1/GraphType1';
import GraphType2 from '../publishing/GraphType2/GraphType2';
import GraphType3 from '../publishing/GraphType3/GraphType3';
import Export from '../publishing/Export/Export';
import SubPage from '../publishing/SubPage/SubPage';
import ModalPage from '../publishing/ModalPage/ModalPage';
import WorkSheet from '../publishing/WorkSheet/WorkSheet';

const PublishingRoutes = [
    {
        path: 'pub/pilot',
        element: <Pilot />,
    },
    {
        path: 'pub/test',
        element: <Test />,
    },
    {
        path: 'pub/worksheet',
        element: <WorkSheet />,
    },
    {
        path: 'pub/list',
        element: <List />,
    },
    {
        path: 'pub/GraphType1',
        element: <GraphType1 />,
    },
    {
        path: 'pub/GraphType2',
        element: <GraphType2 />,
    },
    {
        path: 'pub/GraphType3',
        element: <GraphType3 />,
    },
    {
        path: 'pub/export',
        element: <Export />,
    },
    {
        path: 'pub/pilot/subPage',
        element: <SubPage />,
    },
    {
        path: 'pub/modalPage',
        element: <ModalPage />,
    }
    
];

export default PublishingRoutes;
