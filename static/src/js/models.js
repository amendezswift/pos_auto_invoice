/** @odoo-module **/
import { Order } from "@point_of_sale/app/store/models";  
import { patch } from "@web/core/utils/patch";

patch(Order.prototype, {
    setup(...args) {
        super.setup(...args);
        if (this.pos.config.invoice_by_default) {
            this.to_invoice = true;
            console.log("AutoInvoiceOrder: marcado to_invoice = true");
        }
    },

    init_from_JSON(json) {
        super.init_from_JSON(json);
        this.to_invoice = json.to_invoice;
        console.log("AutoInvoiceOrder: init_from_JSON ejecutado", json);
    },
});
