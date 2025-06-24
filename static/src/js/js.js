/** @odoo-module */
import { OrderReceipt } from "@point_of_sale/app/screens/receipt_screen/receipt/order_receipt";
import { patch } from "@web/core/utils/patch";
import { useState, Component, xml } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";

patch(OrderReceipt.prototype, {
    async setup() {
        // Llamamos al setup original
        super.setup();

        // Estado local: mantenemos la plantilla y guardamos el invoiceNumber
        this.state = useState({
            template: true,
            invoiceNumber: "",
        });

        // Servicios POS y ORM
        this.pos = useService("pos");
        this.orm = useService("orm");

        // Obtenemos la orden actual
        const order = this.pos.get_order();
        if (order && order.server_id) {
            try {
                // Llamada al método Python via ORM service
                this.state.invoiceNumber = await this.orm.call(
                    "pos.order",
                    "generate_invoice_number",
                    [order.server_id]
                );
                console.log(">>> invoiceNumber:", this.state.invoiceNumber);
            } catch (error) {
                console.error("Error al obtener payment_reference:", error);
            }
        }
    },

    get templateProps() {
        const order = this.pos.get_order();
        const partner = order ? order.get_partner() : null;
        return {
            pos: this.pos,
            data: this.props.data,
            order: order,
            receipt: this.props.data,
            orderlines: this.props.data.orderlines,
            paymentlines: this.props.data.paymentlines,
            partner: partner,
            invoiceNumber: this.state.invoiceNumber,
        };
    },

    get templateComponent() {
        const mainRef = this;
        return class extends Component {
            setup() {}
            static template = xml`${mainRef.pos.config.design_receipt}`
        };
    },

    get isTrue() {
        return this.env.services.pos.config.is_custom_receipt === false;
    },
});
