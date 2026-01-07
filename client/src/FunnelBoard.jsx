import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDroppable,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import FunnelChart from './components/FunnelChart';
import useCustomerStore from './stores/customerStore';

const API_URL = 'http://localhost:3001/api';

// Sortable Card Component
function SortableCard({ customer, theme, onCardClick }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: customer.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const firstProject = customer.projeler && customer.projeler.length > 0 ? customer.projeler[0] : null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onCardClick(customer)}
      className="customer-card"
    >
      <div style={{
        background: theme.background.card,
        border: `1px solid ${theme.border.light}`,
        borderRadius: theme.radius.base,
        padding: '12px',
        marginBottom: '8px',
        cursor: 'grab',
        transition: 'all 0.2s',
        boxShadow: theme.shadows.sm,
      }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = theme.shadows.md;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = theme.shadows.sm;
        }}
      >
        <div style={{ fontSize: '14px', fontWeight: '600', color: theme.text.primary, marginBottom: '6px' }}>
          {customer.firmaAdi || 'İsimsiz Firma'}
        </div>
        <div style={{ fontSize: '12px', color: theme.text.muted, marginBottom: '4px' }}>
          {customer.yetkiliAdi || '-'}
        </div>
        {firstProject && (
          <div style={{
            fontSize: '11px',
            color: theme.colors.primary,
            background: theme.colors.primaryLight,
            padding: '3px 8px',
            borderRadius: '4px',
            display: 'inline-block',
            marginTop: '4px',
          }}>
            {firstProject.programTuru}
          </div>
        )}
      </div>
    </div>
  );
}

// Droppable Column Component
function Column({ id, title, customers, theme, stageColor, onCardClick }) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        flex: 1,
        minWidth: '280px',
        background: isOver ? `${stageColor}15` : theme.background.card,
        border: `2px solid ${isOver ? stageColor : `${stageColor}80`}`,
        borderRadius: theme.radius.lg,
        padding: '16px',
        maxHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.2s ease',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '12px',
        paddingBottom: '12px',
        borderBottom: `2px solid ${stageColor}`,
      }}>
        <h3 style={{
          margin: 0,
          fontSize: '16px',
          fontWeight: '700',
          color: theme.text.primary,
        }}>
          {title}
        </h3>
        <span style={{
          background: stageColor,
          color: 'white',
          borderRadius: '12px',
          padding: '2px 10px',
          fontSize: '12px',
          fontWeight: '600',
        }}>
          {customers.length}
        </span>
      </div>

      <div style={{
        overflowY: 'auto',
        flex: 1,
        paddingRight: '4px',
        minHeight: '100px',
      }}>
        <SortableContext items={customers.map(c => c.id)} strategy={verticalListSortingStrategy}>
          {customers.length === 0 ? (
            <div style={{
              padding: '20px',
              textAlign: 'center',
              color: theme.text.muted,
              fontSize: '13px',
              fontStyle: 'italic',
            }}>
              Buraya sürükleyin...
            </div>
          ) : (
            customers.map(customer => (
              <SortableCard
                key={customer.id}
                customer={customer}
                theme={theme}
                onCardClick={onCardClick}
              />
            ))
          )}
        </SortableContext>
      </div>
    </div>
  );
}

// Main Funnel Board Component
export default function FunnelBoard({ theme, onCustomerClick }) {
  const { customers, updateCustomer } = useCustomerStore();
  const [activeId, setActiveId] = useState(null);

  // Derive Kanban data directly from the global store
  const kanbanData = {
    Hedef: customers.filter(c => c.durum === 'hedef'),
    Potansiyel: customers.filter(c => c.durum === 'potansiyel'),
    Degerlendirme: customers.filter(c => c.durum === 'degerlendirme'),
    Aktif: customers.filter(c => c.durum === 'aktif'),
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Move customer to new stage
  const handleMoveCustomer = async (customerId, newStage) => {
    try {
      // Optimistically update or just call the store action
      await updateCustomer(customerId, { durum: newStage });
    } catch (error) {
      console.error('Müşteri taşınamadı:', error);
    }
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    setActiveId(null);

    if (!over) {
      return;
    }

    // Determine target stage
    let targetStage = null;

    // Check if we dropped over a droppable zone (column)
    if (['hedef', 'potansiyel', 'degerlendirme', 'aktif'].includes(over.id)) {
      targetStage = over.id; // Corrected: IDs are lowercase in the columns
    } else {
      // Dropped over a card, find which column that card is in
      // Helper to find customer's current status
      const customer = customers.find(c => c.id === over.id);
      if (customer) {
        targetStage = customer.durum;
      }
    }

    // Move customer if stage changed
    const activeCustomer = customers.find(c => c.id === active.id);
    if (activeCustomer && targetStage && activeCustomer.durum !== targetStage) {
      handleMoveCustomer(active.id, targetStage);
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const activeCustomer = activeId
    ? customers.find(c => c.id === activeId)
    : null;

  const stageColors = {
    Potansiyel: theme.colors.warning,
    Aktif: theme.colors.primary,
    Hedef: theme.colors.success,
  };



  return (
    <div style={{ padding: '0 10px' }}>
      <h2 style={{
        color: theme.text.primary,
        marginBottom: '20px',
        fontSize: theme.fontSize['2xl'],
        fontWeight: '700',
      }}>
        Müşteri Hunisi (Kanban)
      </h2>

      {/* Funnel Analytics Chart */}
      <FunnelChart theme={theme} />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div style={{
          display: 'flex',
          gap: '16px',
          overflowX: 'auto',
          paddingBottom: '10px',
        }}>
          {/* 1. Müşteri Havuzu (Hedef) */}
          <Column
            id="hedef"
            title="Müşteri Havuzu"
            customers={kanbanData.Hedef || []} // Note: Backend might still send uppercase keys
            theme={theme}
            stageColor="#fbbf24" // Amber
            onCardClick={onCustomerClick}
          />
          {/* 2. Ön Görüşme (Potansiyel) */}
          <Column
            id="potansiyel"
            title="Ön Görüşme"
            customers={kanbanData.Potansiyel || []}
            theme={theme}
            stageColor="#f472b6" // Pink
            onCardClick={onCustomerClick}
          />
          {/* 3. Detaylı Görüşme (Değerlendirme) */}
          <Column
            id="degerlendirme"
            title="Detaylı Görüşme"
            customers={kanbanData.Degerlendirme || []} // Need to ensure backend/frontend logic populates this
            theme={theme}
            stageColor="#60a5fa" // Blue
            onCardClick={onCustomerClick}
          />
          {/* 4. Satış (Aktif) */}
          <Column
            id="aktif"
            title="Satış"
            customers={kanbanData.Aktif || []}
            theme={theme}
            stageColor="#a78bfa" // Violet
            onCardClick={onCustomerClick}
          />
        </div>

        <DragOverlay>
          {activeCustomer ? (
            <div style={{
              background: theme.background.card,
              border: `2px solid ${theme.colors.primary}`,
              borderRadius: theme.radius.base,
              padding: '12px',
              boxShadow: theme.shadows.lg,
              cursor: 'grabbing',
            }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: theme.text.primary }}>
                {activeCustomer.firmaAdi || 'İsimsiz Firma'}
              </div>
              <div style={{ fontSize: '12px', color: theme.text.muted, marginTop: '4px' }}>
                {activeCustomer.yetkiliAdi || '-'}
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
