document.addEventListener('DOMContentLoaded', function () {

    const builder = document.getElementById('circuit-builder');

    let selectedComponentType = null;
    let firstSelectedElement = null;
    let secondSelectedElement = null;
    let isRemoveMode = false;

    document.querySelectorAll('.component').forEach(comp => {
        comp.addEventListener('click', () => {
            if (comp.dataset.type === 'trash-bin') {
                isRemoveMode = !isRemoveMode;
                if (isRemoveMode) {
                    selectComponent(comp);
                    selectedComponentType = 'trash-bin';
                } else {
                    deselectComponent(comp);
                    selectedComponentType = null;
                }
            } else if (!isRemoveMode) {
                if (selectedComponentType === comp.dataset.type) {
                    deselectComponent(comp);
                    selectedComponentType = null;
                } else {
                    // Deselect previously selected component
                    document.querySelectorAll('.component').forEach(c => deselectComponent(c));
    
                    // Select the new component
                    selectedComponentType = comp.dataset.type;
                    comp.style.cursor = 'grab';
                    comp.style.border = '2px solid #007bff';
                }
            }
        });
    });

    // Add click listener to the circuit builder
    builder.addEventListener('click', event => {
        if (isRemoveMode) {
            const target = event.target.closest('.component');
            if (target && builder.contains(target)) {
                removeComponentAndLines(target);
            }
        } else if (selectedComponentType && selectedComponentType !== 'trash-bin') {
            const element = createElement(selectedComponentType);
            if (element) {
                element.style.position = 'absolute';
                element.style.left = `${event.offsetX}px`;
                element.style.top = `${event.offsetY}px`;
                builder.appendChild(element);

                // Add click functionality for selecting elements in the builder
                element.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (!isRemoveMode) {
                        clearSelectionPanel(); // Deselect components in the panel
                        handleComponentSelection(element);
                    } else {
                        removeComponentAndLines(element);
                    }
                });
            }
        }
    });

    // Handle selecting components inside the circuit builder
    function handleComponentSelection(element) {
        if (isRemoveMode) {
            removeComponentAndLines(element);
            return;
        }

        if (firstSelectedElement && firstSelectedElement === element) {
            // Deselect the first element
            deselectComponent(element);
            firstSelectedElement = null;
        } else if (!firstSelectedElement) {
            // Select the first element
            firstSelectedElement = element;
            selectComponent(element);
        } else {
            // Select the second element and link them
            secondSelectedElement = element;
            selectComponent(element);
            linkComponents(firstSelectedElement, secondSelectedElement);

            // Deselect both after linking
            deselectComponent(firstSelectedElement);
            deselectComponent(secondSelectedElement);
            firstSelectedElement = null;
            secondSelectedElement = null;
        }
    }

    // Draw a line between two components
    function linkComponents(comp1, comp2) {
        const line = document.createElement('div');
        line.classList.add('connection-line');

        // Add data attributes to track linked components
        line.dataset.sourceId = comp1.dataset.id || generateId();
        line.dataset.targetId = comp2.dataset.id || generateId();

        const rect1 = comp1.getBoundingClientRect();
        const rect2 = comp2.getBoundingClientRect();
        const builderRect = builder.getBoundingClientRect();

        const x1 = rect1.left + rect1.width / 2 - builderRect.left;
        const y1 = rect1.top + rect1.height / 2 - builderRect.top;
        const x2 = rect2.left + rect2.width / 2 - builderRect.left;
        const y2 = rect2.top + rect2.height / 2 - builderRect.top;

        // Set line styles and position
        const length = Math.hypot(x2 - x1, y2 - y1);
        const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

        line.style.width = `${length}px`;
        line.style.transform = `rotate(${angle}deg)`;
        line.style.transformOrigin = '0 0';
        line.style.position = 'absolute';
        line.style.left = `${x1}px`;
        line.style.top = `${y1}px`;
        line.style.height = '2px';
        line.style.backgroundColor = 'black';

        builder.appendChild(line);
    }

    // Remove a component and any associated lines
    function removeComponentAndLines(component) {
        // Remove any lines connected to the component
        document.querySelectorAll('.connection-line').forEach(line => {
            if (
                line.dataset.sourceId === component.dataset.id ||
                line.dataset.targetId === component.dataset.id
            ) {
                builder.removeChild(line);
            }
        });
        builder.removeChild(component);
    }

    function deselectComponent(comp) {
        comp.style.border = 'none';
    }

    function selectComponent(comp) {
        comp.style.border = '2px dashed red';
    }

    function clearSelectionPanel() {
        document.querySelectorAll('.component').forEach(comp => {
            if (comp.dataset.type !== 'trash-bin' || !isRemoveMode) {
                deselectComponent(comp);
            }
        });
        if (!isRemoveMode) {
            selectedComponentType = null;
        }
    }

    function createElement(type) {
        let element;
        switch (type) {
            case 'battery':
                element = createBatteryElement();
                break;
            case 'resistor':
                element = createResistorElement();
                break;
            case 'lamp':
                element = createLampElement();
                break;
            case 'capacitor':
                element = createCapacitorElement();
                break;
            case 'diode':
            default:
                console.error(`Unknown component type: ${type}`);
                break;
        }
        element.dataset.id = generateId();
        return element;
    }

    function createBatteryElement() {
        const element = document.createElement('div');
        element.classList.add('component');
        element.dataset.type = 'battery';
        element.innerHTML = `
            <div>Battery</div>
            <img src="/static/images/Battery.png" alt="Battery" height="50px">
        `;
        return element;
    }

    function createResistorElement() {
        const element = document.createElement('div');
        element.classList.add('component');
        element.dataset.type = 'resistor';
        element.innerHTML = `
            <div>Resistor</div>
            <img src="/static/images/Resistor.png" alt="Resistor" height="50px">
        `;
        return element;
    }

    function createLampElement() {
        const element = document.createElement('div');
        element.classList.add('component');
        element.dataset.type = 'lamp';
        element.innerHTML = `
            <div>Lamp</div>
            <img src="/static/images/Lamp.png" alt="Lamp" height="50px">
        `;
        return element;
    }

    function createCapacitorElement() {
        const element = document.createElement('div');
        element.classList.add('component');
        element.dataset.type = 'capacitor';
        element.innerHTML = `
            <div>Capacitor</div>
            <img src="/static/images/Capacitor.png" alt="Capacitor" height="50px">
        `;
        return element;
    }

    // Generate a unique ID for components and lines
    function generateId() {
        return `id-${Math.random().toString(36).substr(2, 9)}`;
    }

    document.getElementById('save-circuit').addEventListener('click', async () => {
        const circuitBuilder = document.getElementById('circuit-builder');
    
        try {
            const renderedCanvas = await html2canvas(circuitBuilder, {
                backgroundColor: null, 
                logging: true,         
                useCORS: true          
            });
    
            const dataURL = renderedCanvas.toDataURL('image/png');
    
            const canvasDataInput = document.getElementById('canvas-data');
            canvasDataInput.value = dataURL;
    
            const saveForm = document.getElementById('save-form');
            saveForm.submit();
        } catch (error) {
            console.error('Error saving circuit:', error);
            alert('There was an error saving the circuit. Please try again.');
        }
    });
});
