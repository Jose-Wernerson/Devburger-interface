export function formatDate(date) {
	return new Date(date).toLocaleDateString('pt-BR', {
		day: '2-digit',
		month: 'short',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false, // Usa formato de 24 horas (remova se preferir 12 horas)
	});
}
