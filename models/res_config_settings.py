
from odoo import fields, models

class ResConfigSettings(models.TransientModel):
    _inherit = "res.config.settings"

    pos_invoice_by_default = fields.Boolean(
        string="Facturar por defecto",
        related="pos_config_id.invoice_by_default",
        readonly=False,
        help="Establece que las órdenes del punto de venta se facturen automáticamente por defecto"
    )
