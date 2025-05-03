<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" indent="yes"/>
    <xsl:template match="/*">
    <html>
        <head>
            <title><xsl:value-of select="name()"/></title>
            <link rel="stylesheet" type="text/css" href="../estilos/inventario.css"/>
        </head>
        <body>
          <header>
            
          </header>
          
            <table border="1">
                <thead>
            	<tr>
              		<th>Codigo</th>
					
              <th>Nombre</th>
              <th>Categoria</th>
              <th>Precio</th>
              <th>Stock</th>
            </tr>
          </thead>
                <tbody>
                    <xsl:apply-templates select="producto"/>
                </tbody>
            </table>
            <div style="text-align:center;">
				<button class="inventario_volver" onclick="window.location.href='../paginas/tabla.html'">Volver atras</button>
			</div>
			<footer class="footer">
                <p>© 2025 My Company. All rights reserved.</p>
            </footer>
        </body>
    </html>
    </xsl:template>
    <xsl:template match="producto">
    <tr>
        <td>
            <xsl:value-of select="@codigo"/>
        </td>
        <td>
            <xsl:value-of select="nombre"/>
        </td>
        <td>
            <xsl:value-of select="categoria"/>
        </td>
        <td>
            <xsl:value-of select="precio"/>
        </td>
        <td>
            <xsl:value-of select="stock"/>
        </td>
    </tr>
    </xsl:template>
</xsl:stylesheet>
