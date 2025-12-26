import { Routes } from '@angular/router';
import { CustomerLayout } from './components/customer-layout/customer-layout';
import { CustomerList } from './pages/customer/customer-list/customer-list';
import { CustomerForm } from './pages/customer/customer-form/customer-form';
import { CustomerDetail } from './pages/customer/customer-detail/customer-detail';
import { InventoryItemLayout } from './components/inventory-item-layout/inventory-item-layout';
import { InventoryItemList } from './pages/inventory-item/inventory-item-list/inventory-item-list';
import { InventoryItemForm } from './pages/inventory-item/inventory-item-form/inventory-item-form';
import { InventoryItemDetail } from './pages/inventory-item/inventory-item-detail/inventory-item-detail';
import { LocationList } from './pages/location/location-list/location-list';
import { LocationLayout } from './components/location-layout/location-layout';
import { LocationForm } from './pages/location/location-form/location-form';
import { LocationDetail } from './pages/location/location-detail/location-detail';
import { OrderLayout } from './components/order-layout/order-layout';
import { OrderList } from './pages/order/order-list/order-list';
import { OrderForm } from './pages/order/order-form/order-form';
import { OrderDetail } from './pages/order/order-detail/order-detail';
import { ProductLayout } from './components/product-layout/product-layout';
import { ProductList } from './pages/product/product-list/product-list';
import { ProductForm } from './pages/product/product-form/product-form';
import { ProductDetail } from './pages/product/product-detail/product-detail';

export const routes: Routes = [
    {
        path:"customers",
        component: CustomerLayout,
        children: [
            {path: "", loadComponent: () => CustomerList},
            {path: "create", loadComponent: () => CustomerForm},
            {path: "/:id", loadComponent: () => CustomerDetail}
        ]
    },
    {
        path:"inventory-items",
        component: InventoryItemLayout,
        children: [
            {path: "", loadComponent: () => InventoryItemList},
            {path: "create", loadComponent: () => InventoryItemForm},
            {path: "/:id", loadComponent: () => InventoryItemDetail}
        ]
    },
    {
        path:"location",
        component: LocationLayout,
        children: [
            {path: "", loadComponent: () => LocationList},
            {path: "create", loadComponent: () => LocationForm},
            {path: "/:id", loadComponent: () => LocationDetail}
        ]
    },
    {
        path:"orders",
        component: OrderLayout,
        children: [
            {path: "", loadComponent: () => OrderList},
            {path: "create", loadComponent: () => OrderForm},
            {path: "/:id", loadComponent: () => OrderDetail}
        ]
    },
    {
        path:"products",
        component: ProductLayout,
        children: [
            {path: "", loadComponent: () => ProductList},
            {path: "create", loadComponent: () => ProductForm},
            {path: "/:id", loadComponent: () => ProductDetail}
        ]
    }
];
