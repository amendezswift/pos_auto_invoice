# -*- coding: utf-8 -*-
{
    "name": "Factura automática en Punto de Venta",
    "summary": "Permite establecer las órdenes de POS para facturarse automáticamente por defecto",
    "version": "18.0",
    "category": "Point of Sale",
    "website": "https://www.swift-solutions.co",
    "author": "Swift Solutions",
    "license": "AGPL-3",
    "depends": [
        "point_of_sale",
    ],
    "data": [
        "views/res_config_settings_view.xml",
    ],
    "assets": {
        "point_of_sale.assets_prod": [
            "pos_auto_invoice/static/src/js/models.js",
        ],
    },
    "installable": True,
    "application": False,
    "auto_install": False,
}
