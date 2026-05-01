/**
 * Página de gestión de productos (admin)
 * TODO: Implementar en próximos pasos
 */
export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Gestión de Productos</h1>
        <p className="mt-2 text-muted-foreground">
          Aquí podras crear, editar y eliminar productos
        </p>
      </div>

      {/* Placeholder content */}
      <div className="rounded-lg border border-border bg-card p-6">
        <p className="text-muted-foreground">
          📦 Sección de productos - Coming soon en próximos pasos
        </p>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Gestión de Productos | Admin',
};
