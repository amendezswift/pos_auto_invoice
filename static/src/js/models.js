/** @odoo-module **/

import { PosOrder } from "@point_of_sale/app/models/pos_order";
import { patch } from "@web/core/utils/patch";

patch(PosOrder.prototype, {
    setup(vals) {
        super.setup(vals);
        if (this.config.invoice_by_default) {
            this.to_invoice = true;
            console.log("AutoInvoiceOrder: Configuración activada, se marca to_invoice = true");
        }
    },

    init_from_JSON(json) {
        super.init_from_JSON(json);
        this.to_invoice = json.to_invoice;
        console.log("AutoInvoiceOrder: init_from_JSON ejecutado", { json: json });
    },
});
