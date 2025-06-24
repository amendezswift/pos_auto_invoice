
from odoo import fields, models

class PosConfig(models.Model):
    _inherit = "pos.config"

    invoice_by_default = fields.Boolean(
        string="Facturar por defecto",
        help="Establece que las órdenes del punto de venta se facturen automáticamente por defecto"
    )


 @api.model
    def _get_pos_ui_fields(self):
        fields = super()._get_pos_ui_fields()
        fields.append("invoice_by_default")
        return fields
