'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Course {
    id_curso: number;
    titulo: string;
}

interface User {
    nombre_completo: string;
    email: string;
}

export default function PurchaseInterestForm({ course }: { course: Course }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [formData, setFormData] = useState({ name: '', email: '' });

    useEffect(() => {
        // Check for logged-in user in localStorage on the client side
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            const parsedUser = JSON.parse(loggedInUser);
            setUser(parsedUser);
            setFormData({ name: parsedUser.nombre_completo, email: parsedUser.email });
        }
    }, [isDialogOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    }

    const handleSendWhatsApp = () => {
        const courseName = course.titulo;
        const userName = formData.name;
        const userEmail = formData.email;

        if (!userName || !userEmail) {
            alert('Por favor, completa tu nombre y correo electrónico.');
            return;
        }

        const message = `¡Hola! 👋 Estoy interesado/a en el curso "${courseName}". Mi nombre es ${userName} y mi correo es ${userEmail}. ¡Quisiera más información, por favor!`;
        const whatsappUrl = `https://wa.me/573127085169?text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, '_blank');
        setIsDialogOpen(false);
    };

    return (
        <>
            <Button className="w-full" size="lg" onClick={() => setIsDialogOpen(true)}>
                ¡Me Interesa!
            </Button>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Interés en el curso: {course.titulo}</DialogTitle>
                        <DialogDescription>
                            Estás a un paso de empezar. Confirma tus datos para que podamos contactarte.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <div>
                            <Label htmlFor="course">Curso Seleccionado</Label>
                            <Input id="course" value={course.titulo} disabled />
                        </div>
                        <div>
                            <Label htmlFor="name">Tu Nombre</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                disabled={!!user} // Disable if user is logged in
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">Tu Correo Electrónico</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={!!user} // Disable if user is logged in
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                        <Button onClick={handleSendWhatsApp}>Continuar por WhatsApp</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
