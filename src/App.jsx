import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';

// Define context for sharing application state
const AppContext = createContext();

/**
 * NotificationModal Component
 * A reusable modal for displaying messages, errors, or confirmation prompts.
 * Uses inline CSS for styling.
 */
const NotificationModal = ({ isOpen, onClose, onConfirm, title, message, type = 'info' }) => {
    if (!isOpen) return null;

    // Determine button styles based on type
    const confirmButtonStyles = {
        backgroundColor: '#ef4444', // red-500
        color: 'white',
        fontWeight: 'bold',
        padding: '8px 16px',
        borderRadius: '6px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease-in-out',
        cursor: 'pointer'
    };

    const defaultButtonStyles = {
        backgroundColor: '#3b82f6', // blue-500
        color: 'white',
        fontWeight: 'bold',
        padding: '8px 16px',
        borderRadius: '6px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease-in-out',
        cursor: 'pointer'
    };

    const closeButtonStyles = {
        backgroundColor: '#d1d5db', // gray-300
        color: '#1f2937', // gray-800
        fontWeight: 'bold',
        padding: '8px 16px',
        borderRadius: '6px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease-in-out',
        cursor: 'pointer'
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(75, 85, 99, 0.75)', // gray-600 with opacity
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            zIndex: 50
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '24px',
                boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
                maxWidth: '384px', // max-w-sm
                width: '100%',
                transform: 'scale(1)', // scale-100
                opacity: 1, // opacity-100
                transition: 'all 0.3s ease-out'
            }}>
                <h3 style={{
                    fontSize: '1.25rem', // text-xl
                    fontWeight: '600', // font-semibold
                    marginBottom: '16px',
                    color: type === 'error' ? '#dc2626' : '#1f2937' // red-600 : gray-800
                }}>{title}</h3>
                <p style={{
                    color: '#374151', // gray-700
                    marginBottom: '24px'
                }}>{message}</p>
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '12px' // space-x-3
                }}>
                    {type === 'confirm' && (
                        <button
                            onClick={onConfirm}
                            style={confirmButtonStyles}
                        >
                            Confirmar
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        style={closeButtonStyles}
                    >
                        {type === 'confirm' ? 'Cancelar' : 'Cerrar'}
                    </button>
                </div>
            </div>
        </div>
    );
};

/**
 * Ahorro Component
 * Handles the initial input of savings and displays the current savings amount.
 * Now manages savings only in local React state.
 */
const Ahorro = () => {
    // Destructure values from AppContext
    const { ahorro, setAhorro, setNotificationModal } = useContext(AppContext);
    // State to hold the temporary input for savings
    const [ahorroInput, setAhorroInput] = useState('');

    /**
     * Handles the setting of the initial savings amount.
     * Validates input and updates local state.
     */
    const handleSetAhorro = useCallback(() => {
        const parsedAhorro = parseFloat(ahorroInput);
        // Validate if input is a valid number and greater than 0
        if (isNaN(parsedAhorro) || parsedAhorro <= 0) {
            setNotificationModal({
                isOpen: true,
                title: 'Error de Ahorro',
                message: 'Por favor, ingresa un número válido y mayor que 0 para tu ahorro inicial.',
                type: 'error'
            });
            return;
        }

        // Update local state directly
        setAhorro(parsedAhorro);
        setNotificationModal({
            isOpen: true,
            title: 'Ahorro Guardado',
            message: `Tu ahorro de $${parsedAhorro.toFixed(2)} ha sido guardado exitosamente.`,
            type: 'info'
        });
    }, [ahorroInput, setAhorro, setNotificationModal]);

    // Render UI based on whether savings are set
    if (ahorro === null) {
        return (
            <div style={{
                background: 'linear-gradient(to right, #7e22ce, #4338ca)', // from-purple-600 to-indigo-700
                padding: '32px',
                borderRadius: '8px',
                boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
                color: 'white',
                textAlign: 'center',
                marginBottom: '32px',
                width: '90%', // Adjusted width for better full screen usage
                maxWidth: '800px', // Adjusted maxWidth to allow more expansion
                margin: '0 auto'
            }}>
                <h2 style={{
                    fontSize: '1.875rem', // text-3xl
                    fontWeight: '800', // font-extrabold
                    marginBottom: '24px'
                }}>Configura tu Ahorro Inicial</h2>
                <p style={{
                    fontSize: '1.125rem', // text-lg
                    marginBottom: '24px'
                }}>Para empezar, por favor ingresa el monto total de tus ahorros actuales.</p>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px' // space-y-4
                }}>
                    <input
                        type="number"
                        placeholder="Ingresa tu ahorro (ej: 1500.50)"
                        value={ahorroInput}
                        onChange={(e) => setAhorroInput(e.target.value)}
                        style={{
                            padding: '12px',
                            borderRadius: '8px',
                            border: '2px solid transparent',
                            color: '#1f2937', // gray-800
                            fontSize: '1.125rem', // text-lg
                            width: '100%',
                            transition: 'all 0.2s ease-in-out',
                            outline: 'none',
                            boxSizing: 'border-box'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#60a5fa'; // blue-400
                            e.target.style.boxShadow = '0 0 0 3px rgba(96, 165, 250, 0.5)'; // ring-blue-300
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'transparent';
                            e.target.style.boxShadow = 'none';
                        }}
                        min="0.01" // Ensure positive input
                        step="0.01" // Allow decimal values
                        aria-label="Ingrese su ahorro inicial"
                    />
                    <button
                        onClick={handleSetAhorro}
                        style={{
                            backgroundColor: '#22c55e', // green-500
                            color: 'white',
                            fontWeight: 'bold',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            transition: 'all 0.3s ease-in-out',
                            cursor: 'pointer',
                            border: 'none'
                        }}
                    >
                        Establecer Ahorro
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            background: 'linear-gradient(to right, #3b82f6, #0d9488)', // from-blue-500 to-teal-600
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
            color: 'white',
            textAlign: 'center',
            marginBottom: '64px', // Increased margin-bottom for more space
            width: '90%', // Adjusted width for better full screen usage
            maxWidth: '800px', // Adjusted maxWidth to allow more expansion
            margin: '0 auto'
        }}>
            <h2 style={{
                fontSize: '1.875rem', // text-3xl
                fontWeight: '800', // font-extrabold
                marginBottom: '12px'
            }}>Tu Ahorro Actual</h2>
            <p style={{
                fontSize: '3rem', // text-5xl
                fontWeight: '800', // font-extrabold
                marginBottom: '8px'
            }}>${ahorro.toFixed(2)}</p>
            <p style={{
                fontSize: '0.875rem', // text-sm
                opacity: 0.8
            }}>El dinero que tienes disponible para gestionar.</p>
        </div>
    );
};

/**
 * Gastos Component (Modal for adding expenses)
 * Provides a form to input new expenses and adds them to the list,
 * updating the savings amount. Now manages expenses only in local React state.
 */
const Gastos = () => {
    // Destructure values from AppContext
    const { ahorro, setAhorro, setGastos, setNotificationModal } = useContext(AppContext);

    // State for modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);
    // States for expense form fields
    const [descripcion, setDescripcion] = useState('');
    const [monto, setMonto] = useState('');

    // Pre-fill date with current month and day
    const today = new Date();
    const defaultDate = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`;

    /**
     * Handles the submission of a new expense.
     * Validates input, checks against savings, and updates local state.
     */
    const handleAddGasto = useCallback((e) => {
        e.preventDefault(); // Prevent default form submission

        const parsedMonto = parseFloat(monto);

        // Validate expense amount
        if (isNaN(parsedMonto) || parsedMonto <= 0) {
            setNotificationModal({
                isOpen: true,
                title: 'Error de Monto',
                message: 'Por favor, ingresa un monto válido y mayor que 0 para el gasto.',
                type: 'error'
            });
            return;
        }

        // Check if expense exceeds current savings
        if (ahorro !== null && parsedMonto > ahorro) {
            setNotificationModal({
                isOpen: true,
                title: 'Gasto Excede Ahorro',
                message: `El monto del gasto ($${parsedMonto.toFixed(2)}) es mayor que tu ahorro actual ($${ahorro.toFixed(2)}). Este gasto no se restará de tu ahorro.`,
                type: 'info' // Changed to info, not error, as it's a warning
            });
            // Still add the expense to the list, but don't deduct from ahorro
            const newGasto = {
                id: Date.now(), // Unique ID for the expense
                description: descripcion,
                amount: parsedMonto,
                date: defaultDate,
                timestamp: new Date().toISOString()
            };
            setGastos((prev) => [...prev, newGasto]); // Update local state for expenses
            // Reset form and close modal
            setDescripcion('');
            setMonto('');
            setIsModalOpen(false);
            return;
        }

        // Calculate new savings
        const newAhorro = ahorro - parsedMonto;

        // Create new expense object
        const newGasto = {
            id: Date.now(), // Unique ID for the expense
            description: descripcion,
            amount: parsedMonto,
            date: defaultDate,
            timestamp: new Date().toISOString()
        };

        // Update local states
        setAhorro(newAhorro);
        setGastos((prev) => {
            const updatedGastos = [...prev, newGasto];
            // Sort expenses by timestamp for consistent order
            updatedGastos.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            return updatedGastos;
        });

        setNotificationModal({
            isOpen: true,
            title: 'Gasto Añadido',
            message: `Gasto de $${parsedMonto.toFixed(2)} añadido exitosamente. Tu ahorro actual es $${newAhorro.toFixed(2)}.`,
            type: 'info'
        });

        // Reset form and close modal
        setDescripcion('');
        setMonto('');
        setIsModalOpen(false);
    }, [ahorro, descripcion, monto, defaultDate, setAhorro, setGastos, setNotificationModal]);

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                style={{
                    backgroundColor: '#16a34a', // green-600
                    color: 'white',
                    fontWeight: 'bold',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease-in-out',
                    cursor: 'pointer',
                    marginBottom: '32px',
                    width: '90%', // Adjusted width for the button
                    maxWidth: '700px', // Increased maxWidth for the button
                    margin: '0 auto',
                    border: 'none'
                }}
            >
                Agregar Nuevo Gasto
            </button>

            {isModalOpen && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(75, 85, 99, 0.75)', // gray-600 with opacity
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem',
                    zIndex: 50
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        padding: '24px',
                        boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
                        maxWidth: '800px', // Increased maxWidth for the modal
                        width: '100%',
                        transform: 'scale(1)', // scale-100
                        opacity: 1, // opacity-100
                        transition: 'all 0.3s ease-out'
                    }}>
                        <h3 style={{
                            fontSize: '1.5rem', // text-2xl
                            fontWeight: 'bold',
                            marginBottom: '24px',
                            color: '#1f2937', // gray-800
                            textAlign: 'center'
                        }}>Registrar Nuevo Gasto</h3>
                        <form onSubmit={handleAddGasto} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px' // space-y-5
                        }}>
                            <div>
                                <label htmlFor="descripcion" style={{
                                    display: 'block',
                                    color: '#374151', // gray-700
                                    fontSize: '0.875rem', // text-sm
                                    fontWeight: '600', // font-semibold
                                    marginBottom: '8px'
                                }}>Descripción:</label>
                                <input
                                    type="text"
                                    id="descripcion"
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                    style={{
                                        padding: '12px',
                                        borderRadius: '8px',
                                        border: '1px solid #d1d5db', // border-gray-300
                                        width: '100%',
                                        color: '#1f2937', // gray-800
                                        transition: 'all 0.2s ease-in-out',
                                        outline: 'none',
                                        boxSizing: 'border-box'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#60a5fa'; // blue-400
                                        e.target.style.boxShadow = '0 0 0 3px rgba(96, 165, 250, 0.5)'; // ring-blue-300
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#d1d5db';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                    placeholder="Ej: Compras del super"
                                    required
                                    aria-label="Descripción del gasto"
                                />
                            </div>
                            <div>
                                <label htmlFor="monto" style={{
                                    display: 'block',
                                    color: '#374151',
                                    fontSize: '0.875rem',
                                    fontWeight: '600',
                                    marginBottom: '8px'
                                }}>Monto:</label>
                                <input
                                    type="number"
                                    id="monto"
                                    value={monto}
                                    onChange={(e) => setMonto(e.target.value)}
                                    style={{
                                        padding: '12px',
                                        borderRadius: '8px',
                                        border: '1px solid #d1d5db',
                                        width: '100%',
                                        color: '#1f2937',
                                        transition: 'all 0.2s ease-in-out',
                                        outline: 'none',
                                        boxSizing: 'border-box'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#60a5fa';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(96, 165, 250, 0.5)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#d1d5db';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                    placeholder="Ej: 50.75"
                                    step="0.01"
                                    min="0.01"
                                    required
                                    aria-label="Monto del gasto"
                                />
                            </div>
                            <div>
                                <label htmlFor="fecha" style={{
                                    display: 'block',
                                    color: '#374151',
                                    fontSize: '0.875rem',
                                    fontWeight: '600',
                                    marginBottom: '8px'
                                }}>Fecha (Mes/Día):</label>
                                <input
                                    type="text"
                                    id="fecha"
                                    value={defaultDate}
                                    readOnly
                                    style={{
                                        padding: '12px',
                                        borderRadius: '8px',
                                        border: '1px solid #d1d5db',
                                        backgroundColor: '#f9fafb', // gray-100
                                        width: '100%',
                                        color: '#4b5563', // gray-600
                                        cursor: 'not-allowed',
                                        boxSizing: 'border-box'
                                    }}
                                    aria-label="Fecha del gasto (automática)"
                                />
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: '12px', // space-x-3
                                marginTop: '24px' // mt-6
                            }}>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    style={{
                                        backgroundColor: '#d1d5db', // gray-300
                                        color: '#1f2937', // gray-800
                                        fontWeight: 'bold',
                                        padding: '8px 20px',
                                        borderRadius: '6px',
                                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                        transition: 'all 0.3s ease-in-out',
                                        cursor: 'pointer',
                                        border: 'none'
                                    }}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    style={{
                                        backgroundColor: '#2563eb', // blue-600
                                        color: 'white',
                                        fontWeight: 'bold',
                                        padding: '8px 20px',
                                        borderRadius: '6px',
                                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                        transition: 'all 0.3s ease-in-out',
                                        cursor: 'pointer',
                                        border: 'none'
                                    }}
                                >
                                    Guardar Gasto
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

/**
 * ListaGastos Component
 * Displays a table of all recorded expenses and allows deletion.
 * Now manages expenses only in local React state.
 */
const ListaGastos = () => {
    // Destructure values from AppContext
    const { ahorro, setAhorro, gastos, setGastos, setNotificationModal } = useContext(AppContext);
    // State for managing delete confirmation modal
    const [confirmDeleteModal, setConfirmDeleteModal] = useState({
        isOpen: false,
        gastoToDelete: null
    });

    /**
     * Opens the confirmation modal before deleting an expense.
     * @param {object} gasto - The expense object to be deleted.
     */
    const handleDeleteConfirmation = useCallback((gasto) => {
        setConfirmDeleteModal({
            isOpen: true,
            gastoToDelete: gasto
        });
    }, []);

    /**
     * Handles the actual deletion of an expense from the list and local state.
     * Re-adds the expense amount back to savings.
     */
    const handleDeleteGasto = useCallback(() => {
        const gasto = confirmDeleteModal.gastoToDelete;
        if (!gasto) return;

        // Calculate new savings by adding the deleted amount back
        const newAhorro = ahorro + gasto.amount;

        // Update local states
        setAhorro(newAhorro);
        setGastos((prev) => prev.filter((item) => item.id !== gasto.id)); // Filter by local 'id'

        setNotificationModal({
            isOpen: true,
            title: 'Gasto Eliminado',
            message: `Gasto de $${gasto.amount.toFixed(2)} eliminado. El monto se ha sumado de nuevo a tu ahorro.`,
            type: 'info'
        });

        // Close confirmation modal
        setConfirmDeleteModal({ isOpen: false, gastoToDelete: null });
    }, [confirmDeleteModal, ahorro, setAhorro, setGastos, setNotificationModal]);


    return (
        <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
            width: '90%', // Adjusted width for better full screen usage
            maxWidth: 'none', // Removed maxWidth constraint for table to allow full width
            margin: '0 auto 32px' // mb-8
        }}>
            <h2 style={{
                fontSize: '1.5rem', // text-2xl
                fontWeight: 'bold',
                marginBottom: '24px',
                color: '#1f2937', // gray-800
                textAlign: 'center'
            }}>Historial de Gastos</h2>

            {gastos.length === 0 ? (
                <p style={{
                    textAlign: 'center',
                    color: '#4b5563', // gray-600
                    fontSize: '1.125rem', // text-lg
                    padding: '32px 0'
                }}>Aún no hay gastos registrados. ¡Agrega uno para empezar!</p>
            ) : (
                <div style={{
                    overflowX: 'auto',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb', // border-gray-200
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                }}>
                    <table style={{
                        minWidth: '100%',
                        borderCollapse: 'collapse',
                        borderSpacing: 0,
                        width: '100%'
                    }}>
                        <thead style={{
                            backgroundColor: '#f9fafb' // gray-50
                        }}>
                            <tr>
                                <th style={{
                                    padding: '12px 24px',
                                    textAlign: 'left',
                                    fontSize: '0.75rem', // text-xs
                                    fontWeight: '500', // font-medium
                                    color: '#6b7280', // gray-500
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em', // tracking-wider
                                    borderBottom: '1px solid #e5e7eb' // divide-y divide-gray-200
                                }}>Fecha</th>
                                <th style={{
                                    padding: '12px 24px',
                                    textAlign: 'left',
                                    fontSize: '0.75rem',
                                    fontWeight: '500',
                                    color: '#6b7280',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    borderBottom: '1px solid #e5e7eb'
                                }}>Descripción</th>
                                <th style={{
                                    padding: '12px 24px',
                                    textAlign: 'left',
                                    fontSize: '0.75rem',
                                    fontWeight: '500',
                                    color: '#6b7280',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    borderBottom: '1px solid #e5e7eb'
                                }}>Monto</th>
                                <th style={{
                                    padding: '12px 24px',
                                    textAlign: 'center',
                                    fontSize: '0.75rem',
                                    fontWeight: '500',
                                    color: '#6b7280',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    borderBottom: '1px solid #e5e7eb'
                                }}>Opciones</th>
                            </tr>
                        </thead>
                        <tbody style={{
                            backgroundColor: 'white',
                            borderBottom: '1px solid #e5e7eb' // divide-y divide-gray-200
                        }}>
                            {gastos.map((gasto) => (
                                <tr key={gasto.id} style={{
                                    transition: 'background-color 0.15s ease-in-out' // hover:bg-gray-50
                                }}>
                                    <td style={{
                                        padding: '16px 24px',
                                        whiteSpace: 'nowrap',
                                        fontSize: '0.875rem', // text-sm
                                        color: '#1f2937' // gray-900
                                    }}>{gasto.date}</td>
                                    <td style={{
                                        padding: '16px 24px',
                                        whiteSpace: 'nowrap',
                                        fontSize: '0.875rem',
                                        color: '#1f2937'
                                    }}>{gasto.description}</td>
                                    <td style={{
                                        padding: '16px 24px',
                                        whiteSpace: 'nowrap',
                                        fontSize: '0.875rem',
                                        color: '#1f2937',
                                        fontWeight: '500' // font-medium
                                    }}>${gasto.amount.toFixed(2)}</td>
                                    <td style={{
                                        padding: '16px 24px',
                                        whiteSpace: 'nowrap',
                                        fontSize: '0.875rem',
                                        textAlign: 'center'
                                    }}>
                                        <button
                                            onClick={() => handleDeleteConfirmation(gasto)}
                                            style={{
                                                color: '#dc2626', // red-600
                                                fontWeight: '600', // font-semibold
                                                padding: '8px 16px',
                                                borderRadius: '6px',
                                                transition: 'all 0.3s ease-in-out',
                                                cursor: 'pointer',
                                                border: 'none',
                                                backgroundColor: 'transparent'
                                            }}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <NotificationModal
                isOpen={confirmDeleteModal.isOpen}
                onClose={() => setConfirmDeleteModal({ isOpen: false, gastoToDelete: null })}
                onConfirm={handleDeleteGasto}
                title="Confirmar Eliminación"
                message={`¿Estás seguro de que quieres eliminar el gasto "${confirmDeleteModal.gastoToDelete?.description}" por $${confirmDeleteModal.gastoToDelete?.amount.toFixed(2)}? El monto se sumará de nuevo a tu ahorro.`}
                type="confirm"
            />
        </div>
    );
};

/**
 * Main App Component
 * Manages global state and renders the main layout.
 */
const App = () => {
    // Application data states
    const [ahorro, setAhorro] = useState(null); // null means not set yet
    const [gastos, setGastos] = useState([]);

    // Notification modal state
    const [notificationModal, setNotificationModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'info'
    });

    return (
        // Provide app states via context
        <AppContext.Provider value={{
            ahorro, setAhorro,
            gastos, setGastos,
            setNotificationModal // Provide the setter for the notification modal
        }}>
            <div style={{
                minHeight: '100vh',
                backgroundColor: 'white', // Fondo blanco aplicado aquí
                padding: '20px', // Increased padding
                width: '100vw', // Use 100vw for full viewport width
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', // Centrado horizontal
                justifyContent: 'flex-start', // Align content to top
                fontFamily: 'sans-serif' // Fallback font, as "Inter" would need external import
            }}>
                <header style={{
                    width: '100%', // Changed to 100%
                    maxWidth: '1200px', // Added a max-width for better readability on very wide screens
                    textAlign: 'center',
                    marginBottom: '32px'
                }}>
                    <h1 style={{
                        fontSize: '3rem', // text-5xl
                        fontWeight: '800', // font-extrabold
                        background: 'linear-gradient(to right, #1d4ed8, #5b21b6)', // from-blue-700 to-purple-900
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        lineHeight: '1.25'
                    }}>
                        Mi Gestor de Gastos
                    </h1>
                </header>

                <main style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%', // Changed to 100%
                    maxWidth: '1200px' // Added a max-width for consistency
                }}>
                    <Ahorro /> {/* Display savings or input form */}
                    {ahorro !== null && ( // Only show expense related components if ahorro is set
                        <>
                            <Gastos /> {/* Add expense button and modal */}
                            <ListaGastos /> {/* List of expenses */}
                        </>
                    )}
                </main>

                {/* Global Notification Modal */}
                <NotificationModal
                    isOpen={notificationModal.isOpen}
                    onClose={() => setNotificationModal({ ...notificationModal, isOpen: false })}
                    onConfirm={notificationModal.onConfirm}
                    title={notificationModal.title}
                    message={notificationModal.message}
                    type={notificationModal.type}
                />
            </div>
        </AppContext.Provider>
    );
};

export default App; // Export the main App component for rendering
