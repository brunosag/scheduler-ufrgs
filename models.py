from app import db


class Cadeira(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(50), nullable=False)


class Horario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    horario = db.Column(db.Time(), nullable=False)


class Turma(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cadeira_id = db.ForeignKey("cadeira.id", on_delete=db.CASCADE)
    horario_id = db.ForeignKey("horario.id", on_delete=db.CASCADE)
    turma = db.Column(db.String(3), nullable=False)
